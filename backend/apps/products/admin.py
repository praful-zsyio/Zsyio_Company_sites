from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'price', 'cloudinary_image', 'images_count', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'category', 'description', 'cloudinary_image')
    ordering = ('-created_at',)

    def images_count(self, obj):
        return len(obj.images) if isinstance(obj.images, list) else 0
    images_count.short_description = "Images"

