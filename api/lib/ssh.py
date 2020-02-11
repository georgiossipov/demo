import paramiko

from ..constants import SSH_COMMANDS
from ..formatters import bash_output_to_json


def execute_bash_command(ipv4_address, root_user, root_password, command):
    data = {
        "output": None,
        "error": None
    }

    if command not in SSH_COMMANDS:
        data["error"] = "Command '{}' is not supported".format(command)
    else:
        try:
            client = paramiko.SSHClient()
            client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
            client.connect(ipv4_address, username=root_user, password=root_password, auth_timeout=3)
            _, stdout, stderr = client.exec_command(SSH_COMMANDS[command]["command"])
            output, error = stdout.readlines(), stderr.read()
            data["output"] = bash_output_to_json(command, output)
            data["error"] = error
            client.close()
        except IOError:
            pass

    return data
