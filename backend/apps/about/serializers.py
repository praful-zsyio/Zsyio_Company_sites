from rest_framework import serializers
from .models import AboutModel

class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutModel
        fields = '__all__'
