from django.db import models
from datetime import datetime

class Posts(models.Model):
    title = models.CharField(max_length=20, blank=True, default="Proof")
    image = models.ImageField(upload_to='assets/images/')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    year = models.IntegerField(default=datetime.today().year)
    month = models.IntegerField(default=datetime.today().month)
    day = models.IntegerField(default=datetime.today().day)

    def __str__(self):
        return f'{self.created_at}'
    
    class Meta():
        verbose_name_plural = "Posts"

class Streak(models.Model):
    count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    year = models.IntegerField(default=datetime.today().year)
    month = models.IntegerField(default=datetime.today().month)
    day = models.IntegerField(default=datetime.today().day)

    def __str__(self):
        return f'{self.created_at} - {self.count}'
    
    class Meta:
        verbose_name_plural = 'Streak'
        unique_together = (('year', 'month', 'day'), )
    