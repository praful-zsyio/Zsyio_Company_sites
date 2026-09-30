from rest_framework import serializers
from .models import ContactSubmission

class ContactSubmissionSerializer(serializers.ModelSerializer):
    company = serializers.CharField(required=False, allow_blank=True, allow_null=True, default='')
    phone = serializers.CharField(required=False, allow_blank=True, allow_null=True, default='')
    services = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        default=list
    )
    subject = serializers.CharField(required=False, allow_blank=True, allow_null=True, default='')

    class Meta:
        model = ContactSubmission
        fields = [
            'id',
            'name',
            'company',
            'email',
            'phone',
            'services',
            'subject',
            'message',
            'created_at',
        ]

    def to_internal_value(self, data):
        data = data.copy() if hasattr(data, 'copy') else dict(data)
        if isinstance(data.get('services'), str):
            val = data['services'].strip()
            data['services'] = [s.strip() for s in val.split(',') if s.strip()] if val else []
        elif data.get('services') is None:
            data['services'] = []
        return super().to_internal_value(data)

