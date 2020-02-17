import keymirror from "keymirror";


const Actions = keymirror({
  "GET_HOSTS": null,
  "GET_HOSTS_SUCCESS": null,
  "GET_HOSTS_FAILURE": null,

  "SET_HOST_COMMAND": null,
  "CLEAR_HOST_COMMAND": null,

  "EXECUTE_COMMAND": null,
  "EXECUTE_COMMAND_SUCCESS": null,
  "EXECUTE_COMMAND_FAILURE": null
});

export {
  Actions
}