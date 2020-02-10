from .lib import ssh, decoders


def get_host_os_info(sender, instance, **kwargs):
    if not instance.date_added:
        password = decoders.decode_password(instance.password)
        client = ssh.get_ssh_client(ipv4_address=instance.ipv4_address,
                                    root_user=instance.username,
                                    root_password=password)
        if client:
            instance.data = ssh.execute_bash_command(client, command='get-os-release-info')
            client.close()

    return instance
