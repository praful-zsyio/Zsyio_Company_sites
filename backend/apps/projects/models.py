from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=255)
    summary = models.TextField()
    description = models.TextField()
    image = models.URLField(help_text="URL to project image")
    tech_stack = models.JSONField(default=list, help_text="List of technologies used")
    tags = models.JSONField(default=list, help_text="List of tags")
    live_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
