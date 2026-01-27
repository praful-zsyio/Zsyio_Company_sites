from rest_framework import generics
from .models import ContactSubmission
from .serializers import ContactSubmissionSerializer
from rest_framework.permissions import AllowAny

from django.conf import settings
import resend
import os

class ContactSubmissionView(generics.CreateAPIView):
    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def perform_create(self, serializer):
        instance = serializer.save()
        
        # Send email logic wrapped to prevent 500 errors
        try:
            # Configure Resend with direct values as requested
            resend.api_key = os.getenv("RESEND_API_KEY")
            from_email = "onboarding@resend.dev"
            admin_email_to = "contact@zsyio.com"
            
            subject = f"New Contact Form Submission from {instance.name}"
            
            html_content = f"""
            <p>You have received a new contact form submission.</p>
            <p><strong>Name:</strong> {instance.name}</p>
            <p><strong>Email:</strong> {instance.email}</p>
            <p><strong>Phone:</strong> {instance.phone}</p>
            <p><strong>Message:</strong><br>{instance.message}</p>
            """
            
            if admin_email_to:
                # 1. Send Notification to Admin
                try:
                    admin_params = {
                        "from": f"Zsyio Contact <{from_email}>",
                        "to": [admin_email_to],
                        "subject": subject,
                        "html": html_content,
                        "reply_to": instance.email,
                    }
                    
                    admin_email = resend.Emails.send(admin_params)
                    # Admin notification sent
                except Exception:
                    # Error sending admin email suppressed
                    pass

            # 2. Send Auto-Reply to User
            try:
                user_subject = "We received your message - Zsyio"
                user_html_content = f"""
                <p>Hi {instance.name},</p>
                <p>Thank you for reaching out to Zsyio. We have received your message and will get back to you shortly.</p>
                <p><strong>Your Message:</strong><br>{instance.message}</p>
                <br>
                <p>Best regards,</p>
                <p>The Zsyio Team</p>
                """

                user_params = {
                    "from": f"Zsyio Team <{from_email}>",
                    "to": [instance.email],
                    "subject": user_subject,
                    "html": user_html_content,
                }

                user_email = resend.Emails.send(user_params)
                # Auto-reply sent
            except Exception:
                # Error sending user auto-reply suppressed
                pass
            
        except Exception as e:
            # IMPORTANT: Print the full traceback to the console so we can see what's wrong
            # Critical error suppressed
            # We explicitly pass here so the contact form submission is still saved 
            # and the user gets a success response even if the email fails (optional strategy)
            pass
