from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
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

    @action(detail=False, methods=['get'], url_path='nav-links')
    def nav_links(self, request):
        """
        Dynamically fetches Product data from database and returns navigation links
        with categories and direct product links.
        """
        products = Product.objects.all().order_by('-created_at')
        categories = list(Product.objects.exclude(category__isnull=True).exclude(category='').values_list('category', flat=True).distinct())

        category_links = [
            {
                "title": cat,
                "category": cat,
                "path": f"/products?category={cat}",
                "count": products.filter(category=cat).count()
            }
            for cat in categories
        ]

        items = [
            {
                "id": p.id,
                "title": p.title,
                "category": p.category,
                "path": f"/products/{p.id}",
                "price": str(p.price) if p.price is not None else "0.00",
                "image": p.cloudinary_image or p.image or ""
            }
            for p in products
        ]

        return Response({
            "title": "Products",
            "path": "/products",
            "total_count": products.count(),
            "categories": category_links,
            "items": items
        })

    @action(detail=False, methods=['get'], url_path='navlink')
    def navlink_alias(self, request):
        """Alias for nav-links to support /api/products/navlink/"""
        return self.nav_links(request)

