from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, default=0.00)
    image = models.URLField(max_length=500, blank=True, null=True, help_text="URL to project image")
    cloudinary_image = models.URLField(max_length=500, blank=True, null=True, help_text="Cloudinary image URL")
    description = models.TextField()
    live_url = models.URLField(max_length=500, blank=True, null=True)
    features = models.JSONField(default=list, blank=True, help_text="List of key features")
    solutions = models.JSONField(default=list, blank=True, help_text="List of solutions provided")

    @property
    def cloudinary_image_url(self):
        return self.cloudinary_image
    
    # Existing fields kept for compatibility with current views & data
    summary = models.TextField(blank=True, default="")
    tech_stack = models.JSONField(default=list, blank=True, help_text="List of technologies used")
    tags = models.JSONField(default=list, blank=True, help_text="List of tags")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

# Model alias for Product
Product = Project
