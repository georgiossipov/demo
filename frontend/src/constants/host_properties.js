export const hostProperties = {
  fields: [
    "id",
    "ipv4_address",
    "ssh_port",
    "username",
    "date_added",
    "data",
    "host_command",
    "pending",
    "error"
  ],
  commands: [
    {
      key: "get-os-release-info",
      text: "Get os release info",
      value: "get-os-release-info"
    },
    {
      key: "get-users",
      text: "Get users",
      value: "get-users"
    },
    {
      key: "get-groups",
      text: "Get groups",
      value: "get-groups"
    },
  ],
  commandProperties: {
    "get-os-release-info": "os",
    "get-users": "users",
    "get-groups": "groups"
  }
};