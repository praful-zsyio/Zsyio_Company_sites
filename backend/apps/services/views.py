from rest_framework import viewsets
from .models import Service, Technology
from .serializers import ServiceSerializer, TechnologySerializer

class ServiceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

class TechnologyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer
