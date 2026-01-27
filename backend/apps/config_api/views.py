from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SiteConfig
from .serializers import SiteConfigSerializer

class ConfigView(APIView):
    def get(self, request):
        config = SiteConfig.objects.first()
        if not config:
            config = SiteConfig.objects.create(site_name="Default Site")
        serializer = SiteConfigSerializer(config)
        return Response(serializer.data)
