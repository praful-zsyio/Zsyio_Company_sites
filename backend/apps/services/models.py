from django.db import models

class Service(models.Model):
    slug = models.SlugField(primary_key=True, max_length=100)
    title = models.CharField(max_length=255)
    description = models.TextField()
    icon = models.CharField(max_length=100, help_text="Lucide icon name")
    base_rate = models.DecimalField(max_digits=10, decimal_places=2)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2)
    gradient = models.CharField(max_length=255, default="from-[#97DFFC] to-[#8EB5F0]")

    def __str__(self):
        return self.title

class Technology(models.Model):
    CATEGORY_CHOICES = [
        ('Frontend', 'Frontend'),
        ('Backend', 'Backend'),
        ('Databases', 'Databases'),
        ('Cloud Solutions', 'Cloud Solutions'),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    icon = models.CharField(max_length=100, help_text="icon name")
    color = models.CharField(max_length=20)

    class Meta:
        verbose_name_plural = "Technologies"

    def __str__(self):
        return self.name
