from django.db import models
from django.db.models import signals
from django.contrib.postgres.fields import JSONField

from .signals import get_host_os_info

# Create your models here.


class HostModel(models.Model):

    ipv4_address = models.GenericIPAddressField(protocol='IPv4', unique=True)
    username = models.CharField(max_length=64, unique=False)
    password = models.CharField(max_length=256)
    date_added = models.DateField(auto_now_add=True)
    data = JSONField(blank=True, null=True)

    def __str__(self):
        return self.ipv4_address

    class Meta:
        ordering = ['ipv4_address']


signals.pre_save.connect(receiver=get_host_os_info, sender=HostModel)
