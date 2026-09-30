from django.test import SimpleTestCase
from .serializers import ProjectSerializer

class ProjectSerializerTests(SimpleTestCase):
    def test_project_serializer_with_images_array(self):
        payload = {
            'title': 'Test Project',
            'category': 'Web Application',
            'summary': 'Short summary',
            'description': 'Full description',
            'images': [
                'https://res.cloudinary.com/demo/image/upload/v1/proj1.png',
                'https://res.cloudinary.com/demo/image/upload/v1/proj2.png'
            ]
        }
        serializer = ProjectSerializer(data=payload)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(len(serializer.validated_data['images']), 2)
        self.assertEqual(serializer.validated_data['images'][0], 'https://res.cloudinary.com/demo/image/upload/v1/proj1.png')

    def test_project_serializer_with_image_urls_alias(self):
        payload = {
            'title': 'Test Project 2',
            'category': 'Mobile App',
            'summary': 'Summary',
            'description': 'Description',
            'image_urls': [
                'https://example.com/img1.jpg',
                'https://example.com/img2.jpg'
            ]
        }
        serializer = ProjectSerializer(data=payload)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(len(serializer.validated_data['images']), 2)
        self.assertEqual(serializer.validated_data['images'], ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'])

    def test_project_serializer_with_comma_separated_images(self):
        payload = {
            'title': 'Test Project 3',
            'category': 'Cloud Architecture',
            'summary': 'Summary',
            'description': 'Description',
            'images': 'https://example.com/x.png, https://example.com/y.png'
        }
        serializer = ProjectSerializer(data=payload)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data['images'], ['https://example.com/x.png', 'https://example.com/y.png'])

