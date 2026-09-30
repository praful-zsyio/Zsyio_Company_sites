from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'client', 'images_count', 'created_at')
    search_fields = ('title', 'category', 'summary', 'description', 'client')
    list_filter = ('category', 'created_at')

    def images_count(self, obj):
        return len(obj.images) if isinstance(obj.images, list) else 0
    images_count.short_description = "Images"

