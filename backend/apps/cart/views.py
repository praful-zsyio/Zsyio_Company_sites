from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CartModel, CartItemModel
from .serializers import CartSerializer, CartItemSerializer
from django.shortcuts import get_object_or_404
from apps.services.models import Service

class CartViewSet(viewsets.ModelViewSet):
    queryset = CartModel.objects.all()
    serializer_class = CartSerializer

    # For simplicity in this demo, we might want to get the 'current' cart for a user or session.
    # We'll stick to standard CRUD for now but add a helper to add items.

    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        cart = self.get_object()
        service_slug = request.data.get('service_slug')
        quantity = int(request.data.get('quantity', 1))

        service = get_object_or_404(Service, slug=service_slug)

        item, created = CartItemModel.objects.get_or_create(cart=cart, service=service)
        if not created:
            item.quantity += quantity
            item.save()
        
        return Response(CartSerializer(cart).data)
