from django.test import SimpleTestCase
from rest_framework import status
from rest_framework.test import APIClient
from .serializers import ContactSubmissionSerializer

class ContactSubmissionTests(SimpleTestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = '/api/contact/'
        self.full_payload = {
            'name': 'Ravi Sharma',
            'company': 'Acme Corp',
            'email': 'ravi@acme.com',
            'phone': '+91 98765 43210',
            'services': ['Web Development', 'Cloud Migration'],
            'subject': 'App Development, Cloud Migration...',
            'message': 'Tell us about your project, timeline, and goals...'
        }
        self.minimal_payload = {
            'name': 'Ravi Sharma',
            'email': 'ravi@acme.com',
            'message': 'Hello world'
        }
        self.invalid_payload = {
            'name': '',
            'email': 'not-an-email',
            'message': ''
        }

    def test_serializer_full_payload(self):
        serializer = ContactSubmissionSerializer(data=self.full_payload)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data['name'], 'Ravi Sharma')
        self.assertEqual(serializer.validated_data['company'], 'Acme Corp')
        self.assertEqual(serializer.validated_data['services'], ['Web Development', 'Cloud Migration'])
        self.assertEqual(serializer.validated_data['subject'], 'App Development, Cloud Migration...')

    def test_serializer_minimal_payload(self):
        serializer = ContactSubmissionSerializer(data=self.minimal_payload)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        self.assertEqual(serializer.validated_data['services'], [])
        self.assertEqual(serializer.validated_data['company'], '')

    def test_serializer_invalid_payload(self):
        serializer = ContactSubmissionSerializer(data=self.invalid_payload)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)
        self.assertIn('email', serializer.errors)
        self.assertIn('message', serializer.errors)

    def test_post_full_payload(self):
        response = self.client.post(self.url, self.full_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data.get('status'), 'success')

    def test_post_invalid_payload(self):
        response = self.client.post(self.url, self.invalid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


