from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.


class HostModel(models.Model):

    ipv4_address = models.GenericIPAddressField(protocol='IPv4', unique=True)
    data = JSONField(blank=True, null=True)

    def __str__(self):
        return self.ipv4_address

    class Meta:
        ordering = ['ipv4_address']
