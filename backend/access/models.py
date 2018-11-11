from django.db import models

class Register(models.Model):
    username = models.CharField(max_length=256)
    email    = models.CharField(max_length=256)
    password = models.CharField(max_length=256)

    def __str__(self):
        return self.username
