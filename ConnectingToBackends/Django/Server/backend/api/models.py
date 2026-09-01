from django.db import models

class Sales(models.Model):
    month = models.CharField(max_length=20)
    revenue = models.IntegerField()
    year = models.IntegerField(default=2026)

    def __str__(self):
        return f"{self.month} - {self.year}"