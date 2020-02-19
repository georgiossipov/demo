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
        fields = ['id', 'ipv4_address', 'ssh_port', 'username', 'password', 'date_added', 'data']
        read_only_fields = ['data']
        extra_kwargs = {
            "password": {"write_only": True}
        }


class HostView(ModelViewSet):

    queryset = HostModel.objects.all()
    serializer_class = HostSerializer

    @action(detail=True, methods=["patch"])
    def execute_bash_command(self, request, pk=None):
        host = self.get_object()
        request_data = request.data
        host_property = request_data.get("property")
        root_password = decoders.decode_password(host.password)
        data = ssh.execute_bash_command(ipv4_address=host.ipv4_address,
                                        root_user=host.username,
                                        root_password=root_password,
                                        command=request_data.get("command"))

        command_output = data.get("output")

        if data.get("error"):
            return Response(data, status.HTTP_400_BAD_REQUEST)

        host.data[host_property] = command_output
        host.save()

        return Response(data={host_property: command_output}, status=status.HTTP_200_OK)
