from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.conf import settings
from rest_framework import serializers

class AllowedEmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom serializer that only allows login for specific email addresses.

    The list of permitted emails should be defined in Django settings as
    `ALLOWED_LOGIN_EMAILS`. If the user's email is not in this list, a
    validation error is raised.
    """

    def validate(self, attrs):
        # Perform the standard validation first (checks credentials)
        data = super().validate(attrs)
        # `self.user` is set by the parent class after successful authentication
        user = getattr(self, "user", None)
        if user is None:
            raise serializers.ValidationError("Authentication failed.")
        allowed_emails = getattr(settings, "ALLOWED_LOGIN_EMAILS", [])
        if user.email not in allowed_emails:
            raise serializers.ValidationError(
                "This email is not authorized to log in."
            )
        return data
