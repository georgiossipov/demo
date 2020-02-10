from .constants import SSH_COMMANDS, USER_FIELD_MAP, GROUP_FIELD_MAP


def format_os_group_info(command, output):
    fields = SSH_COMMANDS[command].get("fields")
    value = {}
    for group in output:
        group_data = {}
        group_field_values = group.strip().split(":")
        group_name = group_field_values[GROUP_FIELD_MAP["group_name"]]
        for field in fields:
            group_value = group_field_values[GROUP_FIELD_MAP[field]]
            if field == "members":
                group_data[field] = group_value.split(",") if len(group_value) > 0 else []
            else:
                group_data[field] = group_value
        value[group_name] = group_data
    return value


def format_os_user_info(command, output):
    fields = SSH_COMMANDS[command].get("fields")
    value = {}
    for user in output:
        user_data = {}
        user_field_values = user.strip().split(":")
        username = user_field_values[USER_FIELD_MAP["username"]]
        for field in fields:
            user_data[field] = user_field_values[USER_FIELD_MAP[field]]
        value[username] = user_data
    return value


def format_os_release_info(command, output):
    fields = SSH_COMMANDS[command].get("fields")
    value = dict()
    for prop in output:
        if prop != '\n':
            k, v = prop.split("=")
            if k.lower() in fields:
                value[k.lower()] = v.strip().replace("\"", "")
    return {"os": value}


dispatch = {
    "get-os-release-info": format_os_release_info,
    "get-users": format_os_user_info,
    "get-groups": format_os_group_info
}


def bash_output_to_json(command, output):
    return dispatch[command](command, output)
