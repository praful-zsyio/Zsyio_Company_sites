import datetime
import re

from django.utils.text import slugify
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.utils.mongo import get_mongo_db, mongo_log

from .auth import MongoJWTAuthentication
from .serializers import (
    ApplicationSerializer,
    ApplicationUpdateSerializer,
    JobSerializer,
)
from .utils import (
    get_client_ip,
    send_application_emails,
    serialize_doc,
    to_object_id,
    upload_resume,
)

JOBS = 'careers_jobs'
APPLICATIONS = 'career_applications'


def _coll(name):
    db = get_mongo_db()
    return db[name] if db is not None else None


def _db_unavailable():
    return Response(
        {'detail': 'Service temporarily unavailable. Please try again later.'},
        status=status.HTTP_503_SERVICE_UNAVAILABLE,
    )


def _find_job(coll, key):
    """Find a job by ObjectId string or slug."""
    oid = to_object_id(key)
    return coll.find_one({'_id': oid} if oid else {'slug': key})


def _unique_slug(coll, title, exclude_id=None):
    base = slugify(title) or 'role'
    slug, n = base, 2
    while True:
        query = {'slug': slug}
        if exclude_id is not None:
            query['_id'] = {'$ne': exclude_id}
        if not coll.find_one(query, {'_id': 1}):
            return slug
        slug = f'{base}-{n}'
        n += 1


# ── Jobs ────────────────────────────────────────────────────────────────────
class JobListCreateView(APIView):
    """
    GET  /api/careers/jobs/            public: open roles
    GET  /api/careers/jobs/?all=true   admin: include closed roles
    POST /api/careers/jobs/            admin: create a role
    """

    authentication_classes = [MongoJWTAuthentication]

    def get_permissions(self):
        return [IsAuthenticated()] if self.request.method == 'POST' else [AllowAny()]

    def get(self, request):
        coll = _coll(JOBS)
        if coll is None:
            return Response([])

        query = {}
        show_all = request.query_params.get('all') == 'true' and request.user.is_authenticated
        if not show_all:
            query['status'] = 'open'
        department = request.query_params.get('department')
        if department:
            query['department'] = department

        jobs = coll.find(query).sort([('order', 1), ('created_at', -1)])
        return Response(serialize_doc(list(jobs)))

    def post(self, request):
        coll = _coll(JOBS)
        if coll is None:
            return _db_unavailable()

        serializer = JobSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        now = datetime.datetime.utcnow()
        doc = dict(serializer.validated_data)
        doc.update({
            'slug': _unique_slug(coll, doc['title']),
            'created_by': request.user.email,
            'created_at': now,
            'updated_at': now,
        })
        coll.insert_one(doc)
        mongo_log('career_logs', {'action': 'job_create', 'title': doc['title'], 'by': request.user.email})
        return Response(serialize_doc(doc), status=status.HTTP_201_CREATED)


class JobDetailView(APIView):
    """
    GET    /api/careers/jobs/<id-or-slug>/   public (closed roles: admin only)
    PATCH  /api/careers/jobs/<id>/           admin
    DELETE /api/careers/jobs/<id>/           admin
    """

    authentication_classes = [MongoJWTAuthentication]

    def get_permissions(self):
        return [AllowAny()] if self.request.method == 'GET' else [IsAuthenticated()]

    def get(self, request, key):
        coll = _coll(JOBS)
        if coll is None:
            return _db_unavailable()
        job = _find_job(coll, key)
        if not job or (job.get('status') != 'open' and not request.user.is_authenticated):
            return Response({'detail': 'Position not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serialize_doc(job))

    def patch(self, request, key):
        coll = _coll(JOBS)
        if coll is None:
            return _db_unavailable()
        job = _find_job(coll, key)
        if not job:
            return Response({'detail': 'Position not found.'}, status=status.HTTP_404_NOT_FOUND)

        # partial=True ignores the serializer defaults, so only sent fields change
        serializer = JobSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        updates = dict(serializer.validated_data)
        if not updates:
            return Response(serialize_doc(job))

        if 'title' in updates and updates['title'] != job.get('title'):
            updates['slug'] = _unique_slug(coll, updates['title'], exclude_id=job['_id'])
        updates['updated_at'] = datetime.datetime.utcnow()

        coll.update_one({'_id': job['_id']}, {'$set': updates})
        mongo_log('career_logs', {'action': 'job_update', 'job_id': str(job['_id']), 'by': request.user.email})
        return Response(serialize_doc(coll.find_one({'_id': job['_id']})))

    put = patch

    def delete(self, request, key):
        coll = _coll(JOBS)
        if coll is None:
            return _db_unavailable()
        job = _find_job(coll, key)
        if not job:
            return Response({'detail': 'Position not found.'}, status=status.HTTP_404_NOT_FOUND)
        coll.delete_one({'_id': job['_id']})
        mongo_log('career_logs', {'action': 'job_delete', 'title': job.get('title'), 'by': request.user.email})
        return Response(status=status.HTTP_204_NO_CONTENT)


# ── Applications ────────────────────────────────────────────────────────────
class ApplyView(APIView):
    """POST /api/careers/apply/ — public, multipart/form-data (includes the resume file)."""

    authentication_classes = []
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):
        # Honeypot: bots fill the hidden field. Pretend success, store nothing.
        if request.data.get('hp_trap') or request.data.get('website'):
            return Response({'status': 'success', 'message': 'Application submitted.'},
                            status=status.HTTP_201_CREATED)

        serializer = ApplicationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        jobs = _coll(JOBS)
        apps = _coll(APPLICATIONS)
        if jobs is None or apps is None:
            return _db_unavailable()

        # Resolve the role
        job_id, job_title = '', 'Open Application'
        if data['job_id']:
            oid = to_object_id(data['job_id'])
            job = jobs.find_one({'_id': oid}) if oid else None
            if not job or job.get('status') != 'open':
                return Response(
                    {'job_id': ['This position is no longer accepting applications.']},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            job_id, job_title = str(job['_id']), job['title']

        # One application per email per role
        if apps.find_one({'email': data['email'], 'job_id': job_id}, {'_id': 1}):
            return Response(
                {'email': ['You have already applied for this position.']},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            resume_url, resume_filename = upload_resume(data['resume'])
        except Exception as exc:
            print(f'[careers] resume upload failed: {exc}')
            return Response(
                {'resume': ['Resume upload failed. Please try again.']},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        now = datetime.datetime.utcnow()
        doc = {k: v for k, v in data.items() if k not in ('resume', 'consent', 'hp_trap', 'website', 'job_id')}
        doc.update({
            'job_id': job_id,
            'job_title': job_title,
            'resume_url': resume_url,
            'resume_filename': resume_filename,
            'status': 'new',
            'notes': '',
            'consent_at': now,
            'ip_address': get_client_ip(request),
            'created_at': now,
            'updated_at': now,
        })
        apps.insert_one(doc)
        mongo_log('career_logs', {'action': 'application', 'job_title': job_title, 'email': data['email']})

        send_application_emails(doc)
        return Response(
            {'status': 'success', 'message': 'Application submitted successfully.'},
            status=status.HTTP_201_CREATED,
        )


class ApplicationListView(APIView):
    """GET /api/careers/applications/?job_id=&status=&q=&limit=  — admin only."""

    authentication_classes = [MongoJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        coll = _coll(APPLICATIONS)
        if coll is None:
            return _db_unavailable()

        params = request.query_params
        query = {}
        if params.get('job_id'):
            query['job_id'] = params['job_id']
        if params.get('status'):
            query['status'] = params['status']
        if params.get('q'):
            rx = {'$regex': re.escape(params['q']), '$options': 'i'}
            query['$or'] = [{'full_name': rx}, {'email': rx}, {'skills': rx}]

        try:
            limit = max(1, min(int(params.get('limit', 200)), 500))
        except ValueError:
            limit = 200

        docs = coll.find(query).sort('created_at', -1).limit(limit)
        return Response(serialize_doc(list(docs)))


class ApplicationDetailView(APIView):
    """GET / PATCH (status, notes) / DELETE /api/careers/applications/<id>/ — admin only."""

    authentication_classes = [MongoJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def _get(self, pk):
        coll = _coll(APPLICATIONS)
        if coll is None:
            return None, None, _db_unavailable()
        oid = to_object_id(pk)
        doc = coll.find_one({'_id': oid}) if oid else None
        if not doc:
            return coll, None, Response({'detail': 'Application not found.'},
                                        status=status.HTTP_404_NOT_FOUND)
        return coll, doc, None

    def get(self, request, pk):
        _, doc, error = self._get(pk)
        return error or Response(serialize_doc(doc))

    def patch(self, request, pk):
        coll, doc, error = self._get(pk)
        if error:
            return error
        serializer = ApplicationUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        updates = dict(serializer.validated_data)
        if updates:
            updates['updated_at'] = datetime.datetime.utcnow()
            coll.update_one({'_id': doc['_id']}, {'$set': updates})
            mongo_log('career_logs', {'action': 'application_update', 'application_id': pk,
                                      'changes': list(updates), 'by': request.user.email})
        return Response(serialize_doc(coll.find_one({'_id': doc['_id']})))

    def delete(self, request, pk):
        coll, doc, error = self._get(pk)
        if error:
            return error
        coll.delete_one({'_id': doc['_id']})
        mongo_log('career_logs', {'action': 'application_delete', 'application_id': pk, 'by': request.user.email})
        return Response(status=status.HTTP_204_NO_CONTENT)
