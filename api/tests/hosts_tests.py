from rest_framework import status
from .base_api_test import BaseAPITestCase


class HostsEndpointTests(BaseAPITestCase):

    def setUp(self):
        super(HostsEndpointTests, self).setUp()
        self.url = 'http://192.168.1.39:8000/api/hosts/'

    def test_get_all_hosts(self):
        self.get_all_instances(
            url=self.url,
            status_code=status.HTTP_200_OK,
            data_length=11
        )

    def test_get_host_by_id(self):
        fields = ["id", "ipv4_address", "data"]
        instance_data = dict(
            id=self.single_host.id,
            name=self.single_host.ipv4_address,
            description=self.single_host.data
        )
        self.get_single_instance(
            url="{}{}/".format(self.url, self.single_host.id),
            status_code=status.HTTP_200_OK,
            fields=fields,
            instance_data=instance_data
        )
