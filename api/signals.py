from .lib import ssh, decoders


def get_host_os_info(sender, instance, **kwargs):
    if not instance.date_added:
        password = decoders.decode_password(instance.password)
        command = ssh.execute_bash_command(ipv4_address=instance.ipv4_address,
                                           root_user=instance.username,
                                           root_password=password,
                                           command="get-os-release-info")

        data = command.get("output") if not command.get("error") else command.get("error")
        instance.data = data

    return instance
