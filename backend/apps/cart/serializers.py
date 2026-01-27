from rest_framework import serializers
from .models import CartModel, CartItemModel
from apps.services.serializers import ServiceSerializer

class CartItemSerializer(serializers.ModelSerializer):
    # Optional: Embed service details for read, accept ID for write
    service_details = ServiceSerializer(source='service', read_only=True)

    class Meta:
        model = CartItemModel
        fields = ['id', 'service', 'service_details', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = CartModel
        fields = ['id', 'user', 'items', 'created_at', 'updated_at']
