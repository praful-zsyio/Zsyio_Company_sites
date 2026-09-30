# Generated for ContactSubmission additions

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='contactsubmission',
            name='company',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AddField(
            model_name='contactsubmission',
            name='services',
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name='contactsubmission',
            name='subject',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='contactsubmission',
            name='phone',
            field=models.CharField(blank=True, default='', max_length=50),
        ),
    ]
