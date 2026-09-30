from django.test import SimpleTestCase
from .serializers import ProductSerializer

class ProductSerializerTests(SimpleTestCase):
    def test_product_serializer_with_images_array(self):
        payload = {
            'title': 'Test Product',
            'category': 'SaaS',
            'price': '99.99',
            'description': 'Product description',
            'images': [
                'https://res.cloudinary.com/demo/image/upload/v1/product1.png',
                'https://res.cloudinary.com/demo/image/upload/v1/product2.png'
            ]
        }
        serializer = ProductSerializer(data=payload)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(len(serializer.validated_data['images']), 2)
        self.assertEqual(serializer.validated_data['images'][0], 'https://res.cloudinary.com/demo/image/upload/v1/product1.png')
        self.assertEqual(serializer.validated_data['image'], 'https://res.cloudinary.com/demo/image/upload/v1/product1.png')

    def test_product_serializer_with_image_urls_alias(self):
        payload = {
            'title': 'Test Product 2',
            'category': 'E-commerce',
            'description': 'Desc',
            'image_urls': [
                'https://example.com/p1.jpg',
                'https://example.com/p2.jpg'
            ]
        }
        serializer = ProductSerializer(data=payload)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(len(serializer.validated_data['images']), 2)
        self.assertEqual(serializer.validated_data['image'], 'https://example.com/p1.jpg')

    def test_product_serializer_with_string_images(self):
        payload = {
            'title': 'Test Product 3',
            'category': 'AI',
            'description': 'Desc',
            'images': 'https://example.com/a.jpg, https://example.com/b.jpg'
        }
        serializer = ProductSerializer(data=payload)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data['images'], ['https://example.com/a.jpg', 'https://example.com/b.jpg'])
