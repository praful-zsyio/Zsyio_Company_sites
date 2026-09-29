# Merged migration — adds extra project detail fields that were in the
# orphaned 0002_project_challenges branch. Depends on 0003 which is the
# canonical continuation of the Sept-17 0002.

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0003_project_cloudinary_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='challenges',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='client',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='completion_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='duration',
            field=models.CharField(blank=True, help_text="e.g. '3 Months'", max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='github_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='project',
            name='role',
            field=models.CharField(blank=True, help_text="e.g. 'Full Stack Development'", max_length=255, null=True),
        ),
    ]
