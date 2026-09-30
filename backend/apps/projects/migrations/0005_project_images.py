from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0004_project_extra_fields'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='images',
            field=models.JSONField(blank=True, default=list, help_text='List of project image URLs'),
        ),
    ]
