from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet

from api.models import HostModel


class HostSerializer(ModelSerializer):

    class Meta:
        model = HostModel
        fields = ['id', 'ipv4_address', 'data']
        read_only_fields = ['data']


class HostView(ModelViewSet):

    queryset = HostModel.objects.all()
    serializer_class = HostSerializer
