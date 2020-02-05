from rest_framework.test import APITestCase
from api.models import HostModel


class BaseAPITestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):

        cls.hosts = [
            HostModel.objects.create(ipv4_address='10.1.175.1'),
            HostModel.objects.create(ipv4_address='10.1.175.2'),
            HostModel.objects.create(ipv4_address='10.1.175.3'),
            HostModel.objects.create(ipv4_address='10.1.175.4'),
            HostModel.objects.create(ipv4_address='10.1.175.5'),
            HostModel.objects.create(ipv4_address='10.1.175.6'),
            HostModel.objects.create(ipv4_address='10.1.175.7'),
            HostModel.objects.create(ipv4_address='10.1.175.8'),
            HostModel.objects.create(ipv4_address='10.1.175.9'),
            HostModel.objects.create(ipv4_address='10.1.175.10'),
        ]

        cls.single_host = HostModel.objects.create(ipv4_address='10.1.175.101')

    def get_all_instances(self, **kwargs):
        response = self.client.get(kwargs.get('url'))
        self.assertEqual(response.status_code, kwargs.get('status_code'))
        self.assertEqual(len(response.data), kwargs.get('data_length'))

    def get_single_instance(self, **kwargs):
        response = self.client.get(kwargs.get('url'))
        self.assertEqual(response.status_code, kwargs.get('status_code'))

        instance_data = kwargs.get('instance_data')

        for field in kwargs.get('fields'):
            self.assertIn(field, response.data)
            value = instance_data.get(field)

            if value:
                self.assertEqual(response.data.get(field), value)
