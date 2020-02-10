import paramiko

from ..constants import SSH_COMMANDS
from ..formatters import bash_output_to_json


def get_ssh_client(ipv4_address, root_user, root_password):
    client = None
    try:
        client = paramiko.SSHClient()
        client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        client.connect(ipv4_address, username=root_user, password=root_password, auth_timeout=3)
    except IOError:
        pass
    return client


def execute_bash_command(client, command):
    _, stdout, stderr = client.exec_command(SSH_COMMANDS[command]["command"])
    output, error = stdout.readlines(), stderr.read()
    return bash_output_to_json(command, output)
