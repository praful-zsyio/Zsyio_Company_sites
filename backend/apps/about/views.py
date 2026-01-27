from rest_framework import viewsets
from .models import AboutModel
from .serializers import AboutSerializer

class AboutViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutModel.objects.all()
    serializer_class = AboutSerializer
