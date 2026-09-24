from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    cloudinary_image_url = serializers.CharField(source='cloudinary_image', required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Product
        fields = '__all__'

    def to_internal_value(self, data):
        if hasattr(data, 'dict'):
            data_dict = data.dict()
        else:
            data_dict = dict(data)

        # Support cloudinary_image_url input parameter alias for cloudinary_image
        if 'cloudinary_image_url' in data_dict and 'cloudinary_image' not in data_dict:
            data_dict['cloudinary_image'] = data_dict['cloudinary_image_url']
        if not data_dict.get('image') and data_dict.get('cloudinary_image'):
            data_dict['image'] = data_dict['cloudinary_image']

        def normalize_list(val):
            if isinstance(val, list):
                return [str(item).strip() for item in val if str(item).strip()]
            if isinstance(val, str):
                parts = [p.strip() for p in val.replace('\r\n', '\n').split('\n') if p.strip()]
                if len(parts) == 1 and ',' in parts[0]:
                    parts = [p.strip() for p in parts[0].split(',') if p.strip()]
                return parts
            return []

        for field in ['features', 'solutions']:
            if field in data_dict and not isinstance(data_dict[field], list):
                data_dict[field] = normalize_list(data_dict[field])

        return super().to_internal_value(data_dict)
