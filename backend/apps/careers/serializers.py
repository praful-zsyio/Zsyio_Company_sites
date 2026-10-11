"""
Validation for careers data.

NOTE: the choice lists below are mirrored in
``frontend/src/data/careersData.js`` (FORM_OPTIONS). Keep them in sync.
"""

import os
import re

from rest_framework import serializers

# ── Choice lists ────────────────────────────────────────────────────────────
JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract']
WORK_MODES = ['On-site', 'Hybrid', 'Remote']
JOB_STATUSES = ['open', 'closed']

EXPERIENCE_CHOICES = [
    'Fresher / Student', '0-1 years', '1-3 years',
    '3-5 years', '5-8 years', '8+ years',
]
NOTICE_PERIOD_CHOICES = [
    'Immediate', '15 days', '30 days', '60 days', '90 days', 'Currently studying',
]
EDUCATION_CHOICES = [
    'High School', 'Diploma', "Bachelor's", "Master's", 'PhD', 'Other',
]
HEARD_FROM_CHOICES = [
    'LinkedIn', 'Referral', 'Company Website', 'GitHub',
    'Instagram', 'Job Board', 'Other',
]
APPLICATION_STATUSES = [
    'new', 'reviewing', 'shortlisted', 'interview', 'offered', 'hired', 'rejected',
]

RESUME_ALLOWED_EXTENSIONS = ('.pdf', '.doc', '.docx')
RESUME_MAX_BYTES = 5 * 1024 * 1024  # 5 MB


class StringListField(serializers.Field):
    """Accepts a list of strings or a comma / newline separated string."""

    def __init__(self, max_items=20, max_length=300, **kwargs):
        self.max_items = max_items
        self.max_item_length = max_length
        super().__init__(**kwargs)

    def to_internal_value(self, data):
        if isinstance(data, str):
            items = re.split(r'[,\n]', data)
        elif isinstance(data, (list, tuple)):
            items = data
        else:
            raise serializers.ValidationError('Expected a list of strings.')

        cleaned = []
        for item in items:
            if not isinstance(item, str):
                raise serializers.ValidationError('Every item must be a string.')
            item = item.strip()
            if not item:
                continue
            if len(item) > self.max_item_length:
                raise serializers.ValidationError(
                    f'Items may be at most {self.max_item_length} characters.'
                )
            cleaned.append(item)

        if len(cleaned) > self.max_items:
            raise serializers.ValidationError(f'At most {self.max_items} items allowed.')
        return cleaned

    def to_representation(self, value):
        return list(value or [])


# ── Jobs ────────────────────────────────────────────────────────────────────
class JobSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=160)
    department = serializers.CharField(max_length=80)
    type = serializers.ChoiceField(choices=JOB_TYPES, default='Full-time')
    work_mode = serializers.ChoiceField(choices=WORK_MODES, default='Hybrid')
    location = serializers.CharField(max_length=120)
    experience = serializers.CharField(max_length=80, required=False, allow_blank=True, default='')
    salary_range = serializers.CharField(max_length=80, required=False, allow_blank=True, default='')
    summary = serializers.CharField(max_length=1500)
    responsibilities = StringListField(max_items=20, required=False, default=list)
    requirements = StringListField(max_items=20, required=False, default=list)
    nice_to_have = StringListField(max_items=20, required=False, default=list)
    skills = StringListField(max_items=25, max_length=40, required=False, default=list)
    openings = serializers.IntegerField(min_value=1, max_value=100, default=1)
    order = serializers.IntegerField(required=False, default=0)
    status = serializers.ChoiceField(choices=JOB_STATUSES, default='open')


# ── Applications ────────────────────────────────────────────────────────────
class ApplicationSerializer(serializers.Serializer):
    # Role (blank = open application)
    job_id = serializers.CharField(required=False, allow_blank=True, default='')

    # About you
    full_name = serializers.CharField(max_length=120)
    email = serializers.EmailField(max_length=254)
    phone = serializers.CharField(max_length=20)
    location = serializers.CharField(max_length=120)

    # Education
    education = serializers.ChoiceField(choices=EDUCATION_CHOICES)
    institution = serializers.CharField(max_length=160, required=False, allow_blank=True, default='')

    # Experience
    total_experience = serializers.ChoiceField(choices=EXPERIENCE_CHOICES)
    current_company = serializers.CharField(max_length=160, required=False, allow_blank=True, default='')
    current_title = serializers.CharField(max_length=160, required=False, allow_blank=True, default='')
    notice_period = serializers.ChoiceField(choices=NOTICE_PERIOD_CHOICES)
    expected_salary = serializers.CharField(max_length=60, required=False, allow_blank=True, default='')

    # Links & skills
    linkedin_url = serializers.URLField(max_length=300, required=False, allow_blank=True, default='')
    portfolio_url = serializers.URLField(max_length=300, required=False, allow_blank=True, default='')
    github_url = serializers.URLField(max_length=300, required=False, allow_blank=True, default='')
    skills = StringListField(max_items=25, max_length=40, required=False, default=list)

    # Resume & message
    resume = serializers.FileField()
    cover_letter = serializers.CharField(min_length=30, max_length=3000)
    heard_from = serializers.ChoiceField(choices=HEARD_FROM_CHOICES, required=False, allow_blank=True, default='')
    consent = serializers.BooleanField()

    # Honeypot — real users never see or fill this in
    hp_trap = serializers.CharField(required=False, allow_blank=True, default='')

    def validate_phone(self, value):
        digits = re.sub(r'\D', '', value)
        if not re.fullmatch(r'[\d\s+\-()]+', value) or not 7 <= len(digits) <= 15:
            raise serializers.ValidationError('Enter a valid phone number.')
        return value.strip()

    def validate_email(self, value):
        return value.strip().lower()

    def validate_full_name(self, value):
        return value.strip()

    def validate_resume(self, value):
        ext = os.path.splitext(value.name)[1].lower()
        if ext not in RESUME_ALLOWED_EXTENSIONS:
            raise serializers.ValidationError('Resume must be a PDF, DOC or DOCX file.')
        if value.size > RESUME_MAX_BYTES:
            raise serializers.ValidationError('Resume must be 5 MB or smaller.')
        return value

    def validate_consent(self, value):
        if not value:
            raise serializers.ValidationError('You must agree before submitting.')
        return value


class ApplicationUpdateSerializer(serializers.Serializer):
    """Fields an admin can change on an existing application."""

    status = serializers.ChoiceField(choices=APPLICATION_STATUSES, required=False)
    notes = serializers.CharField(max_length=3000, required=False, allow_blank=True)
