from django.db import models
from datetime import datetime
from .utils import convert_timestamp_into_epoch, epoch_to_readable

class Posts(models.Model):
    title = models.CharField(max_length=20, blank=True, default="Proof")
    image = models.ImageField(upload_to='images/')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    year = models.IntegerField(default=datetime.today().year)
    month = models.IntegerField(default=datetime.today().month)
    day = models.IntegerField(default=datetime.today().day)

    def __str__(self):
        date_str = str(self.created_at)
        epoch = convert_timestamp_into_epoch(date_str)
        readable = epoch_to_readable(epoch)
        return f'{readable}'
    
    class Meta():
        verbose_name_plural = "Posts"

class Streak(models.Model):
    count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    year = models.IntegerField(default=datetime.today().year)
    month = models.IntegerField(default=datetime.today().month)
    day = models.IntegerField(default=datetime.today().day)

    def __str__(self):
        date_str = str(self.created_at)
        epoch = convert_timestamp_into_epoch(date_str)
        readable = epoch_to_readable(epoch)
        return f'{readable} ({self.year} - {self.month} - {self.day}) {self.count}'
    
    class Meta:
        verbose_name_plural = 'Streak'
        unique_together = (('year', 'month', 'day'), )
    