from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import AllowedEmailTokenObtainPairSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    """JWT token view that only allows specific email addresses to obtain a token."""
    serializer_class = AllowedEmailTokenObtainPairSerializer
