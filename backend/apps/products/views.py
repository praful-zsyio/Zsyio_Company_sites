from rest_framework import viewsets, permissions
from .models import Product
from .serializers import ProductSerializer

class ProductViewSet(viewsets.ModelViewSet):
    """
    API endpoint for listing, adding, and managing products in the database.
    Supports GET (list/retrieve), POST (create/add product), PUT/PATCH (update), DELETE.
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.AllowAny]
