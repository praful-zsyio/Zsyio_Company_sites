import json
import os
from pathlib import Path
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.conf import settings
import cloudinary
import cloudinary.uploader


def _get_sample_data_path():
    """Locate the founders.json sample data file."""
    base_dir = getattr(settings, 'BASE_DIR', Path(__file__).resolve().parent.parent.parent)
    json_path = Path(base_dir) / 'founders.json'
    if not json_path.exists():
        # Fallback to app directory
        json_path = Path(__file__).resolve().parent / 'founders.json'
    return json_path


def load_founders_data():
    """Load founders sample data from JSON without querying the database."""
    path = _get_sample_data_path()
    if path.exists():
        try:
            with open(path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return []


class FoundersListView(APIView):
    """
    API view to list all founding members from JSON sample data.
    Does NOT query or mutate the database as requested.
    """
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        founders = load_founders_data()

        # Optional query filtering by name or department
        department = request.query_params.get('department')
        if department:
            founders = [f for f in founders if f.get('department', '').lower() == department.lower()]

        return Response({
            "success": True,
            "count": len(founders),
            "data": founders
        }, status=status.HTTP_200_OK)


class FounderDetailView(APIView):
    """
    API view to retrieve an individual founder by id/slug from JSON sample data.
    """
    authentication_classes = []
    permission_classes = []

    def get(self, request, founder_id):
        founders = load_founders_data()
        identifier = founder_id.strip().lower()

        founder = next(
            (f for f in founders if f.get('id', '').lower() == identifier or f.get('name', '').lower().replace(' ', '-') == identifier),
            None
        )

        if not founder:
            return Response({
                "success": False,
                "error": f"Founder with ID '{founder_id}' not found in sample data."
            }, status=status.HTTP_404_NOT_FOUND)

        return Response({
            "success": True,
            "data": founder
        }, status=status.HTTP_200_OK)


class FounderImageUploadView(APIView):
    """
    API view to upload a founder's image to Cloudinary in the 'founders/' folder.
    Returns the generated Cloudinary secure URL.
    """
    parser_classes = (MultiPartParser, FormParser)
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        file_obj = request.FILES.get('image') or request.FILES.get('file')
        if not file_obj:
            return Response({
                "success": False,
                "error": "No image file provided. Send 'image' or 'file' form data."
            }, status=status.HTTP_400_BAD_REQUEST)

        founder_id = request.data.get('founder_id', 'new-founder')

        try:
            cloudinary.config(
                cloud_name=settings.CLOUDINARY_STORAGE['CLOUD_NAME'],
                api_key=settings.CLOUDINARY_STORAGE['API_KEY'],
                api_secret=settings.CLOUDINARY_STORAGE['API_SECRET']
            )

            upload_result = cloudinary.uploader.upload(
                file_obj,
                folder='founders',
                public_id=founder_id,
                overwrite=True,
                resource_type='image'
            )

            return Response({
                "success": True,
                "cloudinary_url": upload_result.get('secure_url'),
                "public_id": upload_result.get('public_id'),
                "format": upload_result.get('format'),
                "width": upload_result.get('width'),
                "height": upload_result.get('height')
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                "success": False,
                "error": f"Cloudinary upload failed: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
