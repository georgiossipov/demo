from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.


class HostModel(models.Model):

    ipv4_address = models.GenericIPAddressField(protocol='IPv4', unique=True)
    ssh_port = models.IntegerField(default=22, blank=TabError, null=True)
    username = models.CharField(max_length=64, unique=False)
    password = models.CharField(max_length=256)
    date_added = models.DateField(auto_now_add=True)
    data = JSONField(blank=True, null=True, default=dict)

    def __str__(self):
        return self.ipv4_address

    class Meta:
        ordering = ['ipv4_address']
