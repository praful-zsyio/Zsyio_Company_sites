from django.contrib import admin
from .models import Insight


@admin.register(Insight)
class InsightAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'type', 'published_at', 'is_featured', 'is_published')
    search_fields = ('title', 'summary', 'slug', 'category')
    list_filter = ('category', 'type', 'is_featured', 'is_published')
