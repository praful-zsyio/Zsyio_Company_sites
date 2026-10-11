"""
Authentication for the careers admin endpoints.

Tokens are issued by ``apps.authentication`` for users stored in MongoDB, so
DRF's default ``JWTAuthentication`` (which looks the user up through the ORM)
cannot resolve them. This class validates the JWT signature as usual but builds
a lightweight user from the token claims instead of querying the database.
"""

from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken


class TokenUser:
    """Minimal authenticated user built from JWT claims."""

    is_anonymous = False
    is_authenticated = True
    is_active = True
    is_staff = True

    def __init__(self, user_id, email, username):
        self.id = user_id
        self.pk = user_id
        self.email = email
        self.username = username

    def __str__(self):
        return self.username or self.email


class MongoJWTAuthentication(JWTAuthentication):
    """Validate the access token and return a ``TokenUser`` (no DB lookup)."""

    def get_user(self, validated_token):
        user_id = validated_token.get('user_id')
        email = (validated_token.get('email') or '').lower()
        if not user_id or not email:
            raise InvalidToken('Token does not identify a user.')

        allowed = [e.lower() for e in getattr(settings, 'ALLOWED_LOGIN_EMAILS', [])]
        if allowed and email not in allowed:
            raise InvalidToken('This account is not authorised.')

        return TokenUser(user_id, email, validated_token.get('username', email))
