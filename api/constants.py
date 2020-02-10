SSH_COMMANDS = {
    "get-os-release-info": {
        "command": "cat /etc/os-release",
        "fields": ["name", "version", "id", "version_id", "pretty_name"]
    },
    "get-users": {
        "command": "getent passwd",
        "fields": ["password", "uid", "gid", "comment", "home_dir", "shell"]
    },
    "get-groups": {
        "command": "getent group",
        "fields": ["password", "gid", "members"]
    }
}

USER_FIELD_MAP = {
    "username": 0,
    "password": 1,
    "uid": 2,
    "gid": 3,
    "comment": 4,
    "home_dir": 5,
    "shell": 6
}

GROUP_FIELD_MAP = {
    "group_name": 0,
    "password": 1,
    "gid": 2,
    "members": 3
}
