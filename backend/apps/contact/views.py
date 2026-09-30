from rest_framework import generics, status, permissions
from rest_framework.response import Response
from .serializers import ContactSubmissionSerializer
from .models import ContactSubmission
from django.conf import settings
import resend
import os
import datetime
from apps.utils.mongo import get_mongo_db, mongo_log

class ContactSubmissionView(generics.CreateAPIView):
    serializer_class = ContactSubmissionSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    
    def get(self, request):
        return Response({
            "status": "success",
            "message": "Contact app reloaded successfully",
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "app": "contact"
        })

    def post(self, request, *args, **kwargs):
        # Validate data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        data = serializer.validated_data
        name = data.get('name')
        company = data.get('company', '')
        email = data.get('email')
        phone = data.get('phone', '')
        services = data.get('services', [])
        subject = data.get('subject', '')
        message = data.get('message')
        
        # Log / Persist to MongoDB
        mongo_log('contact_submissions', {
            'type': 'contact_submission',
            'name': name,
            'company': company,
            'email': email,
            'phone': phone,
            'services': services,
            'subject': subject,
            'message': message,
            'created_at': datetime.datetime.utcnow()
        })

        # Persist via Django model instance for ORM/Admin compatibility if configured
        try:
            ContactSubmission.objects.create(
                name=name,
                company=company,
                email=email,
                phone=phone,
                services=services,
                subject=subject,
                message=message
            )
        except Exception as e:
            # Under mongodb_mock engine or unconfigured relational DB, catch safely
            print(f"[ContactSubmission] ORM save skipped: {e}")
        
        # Email logic
        try:
            resend.api_key = getattr(settings, 'RESEND_API_KEY', os.getenv("RESEND_API_KEY"))
            from_email = getattr(settings, 'RESEND_FROM_EMAIL', "onboarding@resend.dev") or "onboarding@resend.dev"
            admin_email_to = getattr(settings, 'RESEND_ADMIN_EMAIL', "contact@zsyio.com") or "contact@zsyio.com"
            
            services_str = ", ".join(services) if services else "None specified"
            email_subject = f"New Contact Form Submission: {subject}" if subject else f"New Contact Form Submission from {name}"
            
            # Admin Notification
            try:
                resend.Emails.send({
                    "from": f"Zsyio Contact <{from_email}>",
                    "to": [admin_email_to],
                    "subject": email_subject,
                    "html": f"""
                        <h3>New Contact Form Submission</h3>
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Company:</strong> {company or 'N/A'}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Phone:</strong> {phone or 'N/A'}</p>
                        <p><strong>Services of Interest:</strong> {services_str}</p>
                        <p><strong>Subject:</strong> {subject or 'N/A'}</p>
                        <p><strong>Message:</strong></p>
                        <div style="background:#f4f4f4;padding:12px;border-radius:6px;"><p>{message}</p></div>
                    """,
                    "reply_to": email,
                })
            except Exception as e:
                print(f"Error sending admin email: {str(e)}")

            # User Auto-Reply
            try:
                subject_mention = f" regarding <strong>{subject}</strong>" if subject else ""
                resend.Emails.send({
                    "from": f"Zsyio Team <{from_email}>",
                    "to": [email],
                    "subject": "We received your message - Zsyio",
                    "html": f"<p>Hi {name},</p><p>Thank you for reaching out to Zsyio. We have received your message{subject_mention} and will get back to you shortly.</p><br><p>Best regards,<br><strong>Zsyio Team</strong></p>",
                })
            except Exception as e:
                print(f"Error sending user auto-reply: {str(e)}")
                
        except Exception as e:
            print(f"Critical error in contact email logic: {str(e)}")

        return Response({"status": "success", "message": "Message sent successfully"}, status=status.HTTP_201_CREATED)

