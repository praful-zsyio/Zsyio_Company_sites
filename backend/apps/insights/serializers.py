from rest_framework import serializers
from .models import Insight


class InsightSerializer(serializers.ModelSerializer):
    # Allow camelCase aliases in output for frontend compatibility
    publishedAt = serializers.CharField(source='published_at', required=False, allow_blank=True)
    readTime = serializers.CharField(source='read_time', required=False, allow_blank=True)
    clientIndustry = serializers.CharField(source='client_industry', required=False, allow_blank=True, allow_null=True)
    keyTakeaways = serializers.ListField(source='key_takeaways', required=False)
    isFeatured = serializers.BooleanField(source='is_featured', required=False)

    class Meta:
        model = Insight
        fields = [
            'id',
            'slug',
            'title',
            'category',
            'type',
            'summary',
            'published_at',
            'publishedAt',
            'read_time',
            'readTime',
            'author',
            'metrics',
            'tags',
            'client_industry',
            'clientIndustry',
            'challenge',
            'solution',
            'body',
            'key_takeaways',
            'keyTakeaways',
            'is_featured',
            'isFeatured',
            'is_published',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
