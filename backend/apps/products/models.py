from django.db import models

class Product(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0.00)
    image = models.URLField(max_length=500, blank=True, null=True, help_text="URL to product image")
    cloudinary_image = models.URLField(max_length=500, blank=True, null=True, help_text="Cloudinary image URL")
    description = models.TextField()
    live_url = models.URLField(max_length=500, blank=True, null=True)
    features = models.JSONField(default=list, blank=True, help_text="List of features")
    solutions = models.JSONField(default=list, blank=True, help_text="List of solutions")
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def cloudinary_image_url(self):
        return self.cloudinary_image

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
