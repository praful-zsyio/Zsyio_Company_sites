import json
from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    image = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    images = serializers.ListField(
        child=serializers.CharField(),
        required=False,
        default=list
    )

    class Meta:
        model = Project
        fields = '__all__'


    def to_internal_value(self, data):
        if hasattr(data, 'dict'):
            data_dict = data.dict()
        else:
            data_dict = dict(data)

        # Support alias image_urls -> images
        if 'image_urls' in data_dict and 'images' not in data_dict:
            data_dict['images'] = data_dict['image_urls']

        def normalize_list(val):
            if isinstance(val, list):
                return [str(item).strip() for item in val if str(item).strip()]
            if isinstance(val, str):
                val_trimmed = val.strip()
                if val_trimmed.startswith('[') and val_trimmed.endswith(']'):
                    try:
                        parsed = json.loads(val_trimmed)
                        if isinstance(parsed, list):
                            return [str(item).strip() for item in parsed if str(item).strip()]
                    except Exception:
                        pass
                parts = [p.strip() for p in val.replace('\r\n', '\n').split('\n') if p.strip()]
                if len(parts) == 1 and ',' in parts[0]:
                    parts = [p.strip() for p in parts[0].split(',') if p.strip()]
                return parts
            return []

        # Normalize images array
        if 'images' in data_dict:
            data_dict['images'] = normalize_list(data_dict['images'])

        for field in ['tech_stack', 'tags', 'features']:
            if field in data_dict and not isinstance(data_dict[field], list):
                data_dict[field] = normalize_list(data_dict[field])

        # Synchronize single image with images list if image is a string URL
        if data_dict.get('images') and not data_dict.get('image'):
            data_dict['image'] = data_dict['images'][0]
        elif data_dict.get('image') and isinstance(data_dict['image'], str) and not data_dict.get('images'):
            data_dict['images'] = [data_dict['image']]

        return super().to_internal_value(data_dict)

