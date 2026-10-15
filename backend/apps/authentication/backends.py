import re
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.conf import settings
from bson.objectid import ObjectId


def _build_user_instance(doc):
    """Build a functional Django User model instance from a MongoDB document."""
    if not doc:
        return None

    username = doc.get('username') or doc.get('email')
    # Generate a deterministic integer ID for Django session compatibility
    user_id = abs(hash(username)) % (10**8)

    user = User(
        id=user_id,
        username=username,
        email=doc.get('email', ''),
        first_name=doc.get('first_name', ''),
        last_name=doc.get('last_name', ''),
        is_staff=bool(doc.get('is_staff', False)),
        is_superuser=bool(doc.get('is_superuser', False)),
        is_active=bool(doc.get('is_active', True)),
    )
    user.password = doc.get('password', '')

    # Ensure permissions pass for Django Admin
    if user.is_superuser or user.is_staff:
        user.has_perm = lambda perm, obj=None: True
        user.has_perms = lambda perm_list, obj=None: True
        user.has_module_perms = lambda app_label: True

    # No-op save to prevent SQL errors in mock environment
    user.save = lambda *args, **kwargs: None

    return user


class MongoAdminAuthBackend(BaseBackend):
    """
    Custom authentication backend that authenticates Django Admin users
    against MongoDB's 'users' collection.
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        if not username or not password:
            return None

        client = getattr(settings, 'MONGO_CLIENT', None)
        if not client:
            return None

        db = client['zsyio_db']
        users_coll = db['users']

        clean_user = username.strip()

        # Support login via either username or email (case-insensitive)
        doc = users_coll.find_one({
            "$or": [
                {"username": clean_user},
                {"email": clean_user},
                {"username": re.compile(f"^{re.escape(clean_user)}$", re.I)},
                {"email": re.compile(f"^{re.escape(clean_user)}$", re.I)},
            ]
        })

        if not doc:
            return None

        stored_password = doc.get('password', '')
        if not check_password(password, stored_password):
            return None

        if not doc.get('is_active', True):
            return None

        # Django Admin requires is_staff to be True
        if not (doc.get('is_staff') or doc.get('is_superuser')):
            return None

        user = _build_user_instance(doc)
        if user:
            user.backend = f"{self.__module__}.{self.__class__.__name__}"
        return user

    def get_user(self, user_id):
        client = getattr(settings, 'MONGO_CLIENT', None)
        if not client:
            return None

        db = client['zsyio_db']
        users_coll = db['users']

        # Scan for active users to match the deterministic id
        for doc in users_coll.find({"is_active": True}):
            username = doc.get('username') or doc.get('email')
            doc_id = abs(hash(username)) % (10**8)
            if doc_id == user_id or str(doc_id) == str(user_id):
                user = _build_user_instance(doc)
                if user:
                    user.backend = f"{self.__module__}.{self.__class__.__name__}"
                return user

        return None
