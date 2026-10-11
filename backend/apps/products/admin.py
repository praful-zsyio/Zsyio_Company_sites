from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'price', 'cloudinary_image', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'category', 'description', 'cloudinary_image')
    ordering = ('-created_at',)
