from django.db import models


class Insight(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    category = models.CharField(max_length=100, default="Engineering")
    type = models.CharField(max_length=100, default="Engineering Deep Dive")
    summary = models.TextField(help_text="Short teaser / summary")
    published_at = models.CharField(max_length=50, blank=True, null=True, help_text="e.g. 'Oct 2025'")
    read_time = models.CharField(max_length=50, default="5 min read")

    # Author dict: {"name": "...", "role": "...", "avatar": "..."}
    author = models.JSONField(default=dict, blank=True)

    # Metrics list: [{"label": "...", "value": "..."}]
    metrics = models.JSONField(default=list, blank=True)

    # Tags list: ["Kafka", "Go", ...]
    tags = models.JSONField(default=list, blank=True)

    client_industry = models.CharField(max_length=255, blank=True, null=True)
    challenge = models.TextField(blank=True, null=True)
    solution = models.TextField(blank=True, null=True)

    # Structured article body: [{"heading": "...", "content": "..."}]
    body = models.JSONField(default=list, blank=True)

    # Key Takeaways list: ["Takeaway 1", "Takeaway 2"]
    key_takeaways = models.JSONField(default=list, blank=True)

    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title
