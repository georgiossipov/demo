from rest_framework import serializers, status
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

from api.models import HostModel
from ..lib import decoders, ssh


class HostSerializer(serializers.ModelSerializer):

    def create(self, validated_data):
        validated_data['password'] = decoders.encode_password(validated_data['password'])
        obj = HostModel.objects.create(**validated_data)
        return obj

    class Meta:
        model = HostModel
        fields = ['id', 'ipv4_address', 'username', 'password', 'date_added', 'data']
        read_only_fields = ['data']
        write_only_fields = ['password']


class HostView(ModelViewSet):

    queryset = HostModel.objects.all()
    serializer_class = HostSerializer

    @action(detail=True, methods=["post"])
    def get_host_users(self, request, pk=None):
        host = self.get_object()
        root_password = decoders.decode_password(host.password)
        client = ssh.get_ssh_client(ipv4_address=host.ipv4_address, root_user=host.username,
                                    root_password=root_password)
        user_data = ssh.execute_bash_command(client, command="get-users")
        host.data["users"] = user_data
        host.save()
        return Response(data=user_data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def get_host_groups(self, request, pk=None):
        host = self.get_object()
        root_password = decoders.decode_password(host.password)
        client = ssh.get_ssh_client(ipv4_address=host.ipv4_address, root_user=host.username,
                                    root_password=root_password)
        group_data = ssh.execute_bash_command(client, command="get-groups")
        host.data["groups"] = group_data
        host.save()
        return Response(data=group_data, status=status.HTTP_200_OK)
