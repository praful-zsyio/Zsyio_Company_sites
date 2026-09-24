from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SiteConfig, get_default_nav_links
from .serializers import SiteConfigSerializer

class ConfigView(APIView):
    def get(self, request):
        config = SiteConfig.objects.first()
        if not config:
            config = SiteConfig.objects.create(site_name="Default Site")
        serializer = SiteConfigSerializer(config)
        return Response(serializer.data)


class NavLinksView(APIView):
    """
    Returns navigation links including Home, About Us, Services, Projects, and Products.
    """
    def get(self, request):
        config = SiteConfig.objects.first()
        if not config:
            config = SiteConfig.objects.create(site_name="Default Site")
        links = config.nav_links if config.nav_links else get_default_nav_links()
        return Response(links)


class DatabaseStatusView(APIView):
    """
    Returns the real-time health and connection status of both SQLite and MongoDB.
    """
    def get(self, request):
        from config.mongodb import get_all_databases_status
        return Response(get_all_databases_status())

