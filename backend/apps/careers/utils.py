"""Helpers for the careers app: Mongo serialisation, resume upload, emails."""

import datetime
import html
import os
import re
import uuid

import cloudinary
import cloudinary.uploader
from bson.objectid import ObjectId
from django.conf import settings


def serialize_doc(doc):
    """Convert a Mongo document into JSON-friendly data (``_id`` -> ``id``)."""
    if doc is None:
        return None
    if isinstance(doc, list):
        return [serialize_doc(d) for d in doc]
    if isinstance(doc, dict):
        out = {}
        for key, value in doc.items():
            if key == '_id':
                out['id'] = str(value)
            elif isinstance(value, ObjectId):
                out[key] = str(value)
            elif isinstance(value, datetime.datetime):
                out[key] = value.isoformat()
            elif isinstance(value, (list, dict)):
                out[key] = serialize_doc(value)
            else:
                out[key] = value
        return out
    return doc


def to_object_id(value):
    """Return an ObjectId for a valid string, otherwise None."""
    if value and ObjectId.is_valid(str(value)):
        return ObjectId(str(value))
    return None


def get_client_ip(request):
    forwarded = request.META.get('HTTP_X_FORWARDED_FOR')
    if forwarded:
        return forwarded.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')


def upload_resume(uploaded_file):
    """Upload a resume to Cloudinary (as a raw file) and return ``(url, filename)``."""
    cfg = settings.CLOUDINARY_STORAGE
    if not all([cfg.get('CLOUD_NAME'), cfg.get('API_KEY'), cfg.get('API_SECRET')]):
        raise Exception('Cloudinary credentials are not configured.')

    stem, ext = os.path.splitext(uploaded_file.name)
    safe_stem = re.sub(r'[^a-zA-Z0-9_-]+', '-', stem).strip('-')[:40] or 'resume'
    # For raw uploads Cloudinary keeps the extension as part of the public id.
    public_id = f'{uuid.uuid4().hex[:12]}-{safe_stem}{ext.lower()}'

    result = cloudinary.uploader.upload(
        uploaded_file,
        folder='careers/resumes',
        public_id=public_id,
        resource_type='raw',
        use_filename=False,
        unique_filename=False,
        overwrite=False,
    )
    return result.get('secure_url'), uploaded_file.name


# ── Emails (Resend, same approach as the contact app) ───────────────────────
def _resend_config():
    import resend

    resend.api_key = getattr(settings, 'RESEND_API_KEY', None) or os.getenv('RESEND_API_KEY')
    from_email = getattr(settings, 'RESEND_FROM_EMAIL', None) or 'onboarding@resend.dev'
    admin_email = getattr(settings, 'RESEND_ADMIN_EMAIL', None) or 'contact@zsyio.com'
    return resend, from_email, admin_email


def _row(label, value):
    value = html.escape(str(value)) if value not in (None, '') else '—'
    return (
        f'<tr><td style="padding:6px 12px 6px 0;color:#666;vertical-align:top;white-space:nowrap">'
        f'{html.escape(label)}</td><td style="padding:6px 0">{value}</td></tr>'
    )


def send_application_emails(app):
    """Notify the team and auto-reply to the applicant. Never raises."""
    try:
        resend, from_email, admin_email = _resend_config()
    except Exception as exc:  # pragma: no cover - resend import/config problem
        print(f'[careers] email config error: {exc}')
        return

    role = app.get('job_title', 'Open Application')
    name = app.get('full_name', '')

    rows = ''.join([
        _row('Role', role),
        _row('Name', name),
        _row('Email', app.get('email')),
        _row('Phone', app.get('phone')),
        _row('Location', app.get('location')),
        _row('Experience', app.get('total_experience')),
        _row('Current', ' @ '.join(x for x in [app.get('current_title'), app.get('current_company')] if x)),
        _row('Notice period', app.get('notice_period')),
        _row('Expected salary', app.get('expected_salary')),
        _row('Education', ' — '.join(x for x in [app.get('education'), app.get('institution')] if x)),
        _row('Skills', ', '.join(app.get('skills', []))),
        _row('LinkedIn', app.get('linkedin_url')),
        _row('Portfolio', app.get('portfolio_url')),
        _row('GitHub', app.get('github_url')),
        _row('Heard from', app.get('heard_from')),
        _row('Resume', app.get('resume_url')),
    ])
    cover = html.escape(app.get('cover_letter', '')).replace('\n', '<br>')

    try:
        resend.Emails.send({
            'from': f'Zsyio Careers <{from_email}>',
            'to': [admin_email],
            'subject': f'New application: {role} — {name}',
            'reply_to': app.get('email'),
            'html': (
                f'<h2>New job application</h2><table>{rows}</table>'
                f'<h3>Cover letter</h3><p>{cover}</p>'
            ),
        })
    except Exception as exc:
        print(f'[careers] admin email failed: {exc}')

    try:
        resend.Emails.send({
            'from': f'Zsyio Careers <{from_email}>',
            'to': [app.get('email')],
            'subject': 'We received your application — Zsyio',
            'html': (
                f'<p>Hi {html.escape(name)},</p>'
                f'<p>Thanks for applying for <strong>{html.escape(role)}</strong> at Zsyio. '
                'We read every application personally and will get back to you within a week.</p>'
                '<p>— The Zsyio Team</p>'
            ),
        })
    except Exception as exc:
        print(f'[careers] auto-reply failed: {exc}')
