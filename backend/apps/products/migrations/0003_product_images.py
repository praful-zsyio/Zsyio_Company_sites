from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_product_cloudinary_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='images',
            field=models.JSONField(blank=True, default=list, help_text='List of product image URLs'),
        ),
    ]
