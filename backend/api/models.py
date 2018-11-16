from django.db import models
from PIL import Image as Img

class Posts(models.Model):
    title   = models.CharField(max_length=256)
    content = models.TextField()
    photo   = models.FileField(null=True,blank=True)

    def __str__(self):
        return self.title
