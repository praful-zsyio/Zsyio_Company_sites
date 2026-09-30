from django.contrib import admin
from .models import ContactSubmission

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'email', 'phone', 'subject', 'created_at')
    search_fields = ('name', 'company', 'email', 'phone', 'subject', 'message')
    list_filter = ('created_at',)

