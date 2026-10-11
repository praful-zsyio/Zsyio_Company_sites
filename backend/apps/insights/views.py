import datetime
import re
from bson.objectid import ObjectId
from django.utils.text import slugify
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.utils.mongo import get_mongo_db, mongo_log
from .models import Insight
from .serializers import InsightSerializer

DEFAULT_CATEGORIES = [
    "All",
    "Case Studies",
    "Engineering",
    "Cloud Architecture",
    "AI & Data",
]


def get_insights_collection():
    db = get_mongo_db()
    return db['insights'] if db is not None else None


def to_object_id(val):
    if not val:
        return None
    try:
        return ObjectId(val)
    except Exception:
        return None


def serialize_insight_doc(doc):
    """Convert MongoDB doc to JSON-safe dict with both snake_case and camelCase keys."""
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_insight_doc(item) for item in doc]
    if not isinstance(doc, dict):
        return doc

    out = {}
    for k, v in doc.items():
        if k == '_id':
            out['id'] = str(v)
            if 'slug' not in doc:
                out['slug'] = str(v)
        elif isinstance(v, ObjectId):
            out[k] = str(v)
        elif isinstance(v, (datetime.datetime, datetime.date)):
            out[k] = v.isoformat()
        elif isinstance(v, (list, dict)):
            out[k] = serialize_insight_doc(v)
        else:
            out[k] = v

    # Ensure camelCase aliases for frontend compatibility
    if 'published_at' in out and 'publishedAt' not in out:
        out['publishedAt'] = out['published_at']
    elif 'publishedAt' in out and 'published_at' not in out:
        out['published_at'] = out['publishedAt']

    if 'read_time' in out and 'readTime' not in out:
        out['readTime'] = out['read_time']
    elif 'readTime' in out and 'read_time' not in out:
        out['read_time'] = out['readTime']

    if 'client_industry' in out and 'clientIndustry' not in out:
        out['clientIndustry'] = out['client_industry']
    elif 'clientIndustry' in out and 'client_industry' not in out:
        out['client_industry'] = out['clientIndustry']

    if 'key_takeaways' in out and 'keyTakeaways' not in out:
        out['keyTakeaways'] = out['key_takeaways']
    elif 'keyTakeaways' in out and 'key_takeaways' not in out:
        out['key_takeaways'] = out['keyTakeaways']

    if 'is_featured' in out and 'isFeatured' not in out:
        out['isFeatured'] = out['is_featured']
    elif 'isFeatured' in out and 'is_featured' not in out:
        out['is_featured'] = out['isFeatured']

    # Ensure defaults for required UI fields
    out.setdefault('author', {'name': 'Engineering Team', 'role': 'Architecture Group', 'avatar': ''})
    out.setdefault('metrics', [])
    out.setdefault('tags', [])
    out.setdefault('body', [])
    out.setdefault('keyTakeaways', [])
    out.setdefault('key_takeaways', [])

    return out


def _unique_slug(coll, title, exclude_id=None):
    base = slugify(title) or 'insight'
    slug, counter = base, 2
    while True:
        query = {'slug': slug}
        if exclude_id is not None:
            query['_id'] = {'$ne': exclude_id}
        if not coll.find_one(query, {'_id': 1}):
            return slug
        slug = f"{base}-{counter}"
        counter += 1


class InsightViewSet(viewsets.ViewSet):
    """
    MongoDB-backed API endpoints for Insights & Case Studies:
    GET  /api/insights/                 → List insights (supports ?category=, ?search=, ?tag=, ?featured=)
    GET  /api/insights/categories/      → List distinct insight categories
    GET  /api/insights/<slug_or_id>/    → Retrieve single insight by slug or MongoDB ObjectId
    POST /api/insights/                 → Create new insight
    PUT/PATCH /api/insights/<slug_or_id>/ → Update insight
    DELETE /api/insights/<slug_or_id>/  → Delete insight
    """
    permission_classes = [permissions.AllowAny]

    def list(self, request):
        coll = get_insights_collection()
        if coll is None:
            return Response(
                {"error": "Database unavailable", "results": []},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        query = {}
        # Only published by default unless ?all=true
        if request.query_params.get('all') != 'true':
            query['is_published'] = {'$ne': False}

        # Filter by category
        category = request.query_params.get('category')
        if category and category.strip().lower() != 'all':
            query['category'] = {'$regex': f"^{re.escape(category.strip())}$", '$options': 'i'}

        # Filter by tag
        tag = request.query_params.get('tag')
        if tag:
            query['tags'] = {'$regex': f"^{re.escape(tag.strip())}$", '$options': 'i'}

        # Filter by featured
        featured = request.query_params.get('featured')
        if featured is not None:
            is_feat = featured.lower() in ('1', 'true', 'yes')
            query['is_featured'] = is_feat

        # Search filter
        search = request.query_params.get('search')
        if search:
            regex = {'$regex': re.escape(search.strip()), '$options': 'i'}
            query['$or'] = [
                {'title': regex},
                {'summary': regex},
                {'challenge': regex},
                {'tags': regex},
                {'client_industry': regex},
                {'clientIndustry': regex},
            ]

        cursor = coll.find(query).sort('created_at', -1)
        insights = [serialize_insight_doc(doc) for doc in cursor]
        return Response(insights)

    @action(detail=False, methods=['get'])
    def categories(self, request):
        coll = get_insights_collection()
        if coll is None:
            return Response(DEFAULT_CATEGORIES)

        db_categories = coll.distinct('category', {'is_published': {'$ne': False}})
        # Merge defaults preserving order
        merged = ["All"]
        for cat in DEFAULT_CATEGORIES:
            if cat != "All" and cat not in merged:
                merged.append(cat)
        for cat in db_categories:
            if cat and cat not in merged:
                merged.append(cat)

        return Response(merged)

    def retrieve(self, request, pk=None):
        coll = get_insights_collection()
        if coll is None:
            return Response({"detail": "Database unavailable."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        query_conditions = []
        oid = to_object_id(pk)
        if oid:
            query_conditions.append({'_id': oid})
        query_conditions.append({'slug': pk})
        query_conditions.append({'id': pk})

        doc = coll.find_one({'$or': query_conditions})
        if not doc:
            return Response({"detail": f"Insight '{pk}' not found."}, status=status.HTTP_404_NOT_FOUND)

        return Response(serialize_insight_doc(doc))

    def create(self, request):
        coll = get_insights_collection()
        if coll is None:
            return Response({"detail": "Database unavailable."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        data = request.data.copy()
        title = data.get('title')
        if not title:
            return Response({"detail": "Title is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Generate unique slug if not provided
        slug = data.get('slug')
        if not slug:
            slug = _unique_slug(coll, title)
        else:
            slug = slugify(slug)
            if coll.find_one({'slug': slug}):
                return Response({"detail": f"Slug '{slug}' is already in use."}, status=status.HTTP_400_BAD_REQUEST)

        now = datetime.datetime.utcnow()
        doc = {
            'title': title,
            'slug': slug,
            'category': data.get('category', 'Engineering'),
            'type': data.get('type', 'Engineering Deep Dive'),
            'summary': data.get('summary', ''),
            'published_at': data.get('publishedAt') or data.get('published_at') or now.strftime('%b %Y'),
            'read_time': data.get('readTime') or data.get('read_time') or '5 min read',
            'author': data.get('author') or {
                'name': 'Engineering Team',
                'role': 'Distributed Systems Practice',
                'avatar': '',
            },
            'metrics': data.get('metrics', []),
            'tags': data.get('tags', []),
            'client_industry': data.get('clientIndustry') or data.get('client_industry', ''),
            'challenge': data.get('challenge', ''),
            'solution': data.get('solution', ''),
            'body': data.get('body', []),
            'key_takeaways': data.get('keyTakeaways') or data.get('key_takeaways', []),
            'is_featured': bool(data.get('isFeatured') or data.get('is_featured', False)),
            'is_published': bool(data.get('is_published', True)),
            'created_at': now,
            'updated_at': now,
        }

        result = coll.insert_one(doc)
        doc['_id'] = result.inserted_id

        mongo_log('insight_logs', {'action': 'created', 'slug': slug, 'title': title})
        return Response(serialize_insight_doc(doc), status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        return self._do_update(request, pk, partial=False)

    def partial_update(self, request, pk=None):
        return self._do_update(request, pk, partial=True)

    def _do_update(self, request, pk=None, partial=True):
        coll = get_insights_collection()
        if coll is None:
            return Response({"detail": "Database unavailable."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        oid = to_object_id(pk)
        query = {'$or': [{'_id': oid}] if oid else []}
        query['$or'].extend([{'slug': pk}, {'id': pk}])

        existing = coll.find_one(query)
        if not existing:
            return Response({"detail": "Insight not found."}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        updates = {'updated_at': datetime.datetime.utcnow()}

        allowed_fields = [
            'title', 'category', 'type', 'summary', 'published_at', 'read_time',
            'author', 'metrics', 'tags', 'client_industry', 'challenge',
            'solution', 'body', 'key_takeaways', 'is_featured', 'is_published'
        ]

        # Field aliases
        alias_map = {
            'publishedAt': 'published_at',
            'readTime': 'read_time',
            'clientIndustry': 'client_industry',
            'keyTakeaways': 'key_takeaways',
            'isFeatured': 'is_featured',
        }

        for k, v in data.items():
            db_key = alias_map.get(k, k)
            if db_key in allowed_fields:
                updates[db_key] = v

        if 'title' in updates and 'slug' not in data:
            # Keep existing slug or update if user provided slug
            pass
        elif 'slug' in data:
            new_slug = slugify(data['slug'])
            conflict = coll.find_one({'slug': new_slug, '_id': {'$ne': existing['_id']}})
            if conflict:
                return Response({"detail": f"Slug '{new_slug}' is already taken."}, status=status.HTTP_400_BAD_REQUEST)
            updates['slug'] = new_slug

        coll.update_one({'_id': existing['_id']}, {'$set': updates})
        updated_doc = coll.find_one({'_id': existing['_id']})
        mongo_log('insight_logs', {'action': 'updated', 'slug': updated_doc.get('slug')})

        return Response(serialize_insight_doc(updated_doc))

    def destroy(self, request, pk=None):
        coll = get_insights_collection()
        if coll is None:
            return Response({"detail": "Database unavailable."}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        oid = to_object_id(pk)
        query = {'$or': [{'_id': oid}] if oid else []}
        query['$or'].extend([{'slug': pk}, {'id': pk}])

        target = coll.find_one(query)
        if not target:
            return Response({"detail": "Insight not found."}, status=status.HTTP_404_NOT_FOUND)

        coll.delete_one({'_id': target['_id']})
        mongo_log('insight_logs', {'action': 'deleted', 'slug': target.get('slug')})
        return Response({"detail": "Insight deleted successfully."}, status=status.HTTP_200_OK)
