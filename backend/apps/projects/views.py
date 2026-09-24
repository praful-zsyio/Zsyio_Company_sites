from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing, adding, and managing Projects and Products.
    Allows GET, POST, PUT, PATCH, DELETE operations.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.AllowAny]

ProductViewSet = ProjectViewSet
