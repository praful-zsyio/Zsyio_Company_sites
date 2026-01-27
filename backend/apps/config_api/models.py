from django.db import models

class SiteConfig(models.Model):
    site_name = models.CharField(max_length=255, default="Company Name")
    contact_email = models.EmailField(default="contact@example.com")
    logo = models.ImageField(upload_to='config/', blank=True, null=True)
    
    class Meta:
        verbose_name = "Site Configuration"
        verbose_name_plural = "Site Configuration"

    def __str__(self):
        return self.site_name

    def save(self, *args, **kwargs):
        # Singleton pattern: ensure only one instance exists
        if not self.pk and SiteConfig.objects.exists():
            return SiteConfig.objects.first()
        return super().save(*args, **kwargs)
