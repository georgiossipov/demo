import {Actions} from "../constants";

const getHosts = () => {
  return {
    type: Actions.GET_HOSTS,
    payload: {}
  }
};

const getHostsSuccess = (hosts) => {
  return {
    type: Actions.GET_HOSTS_SUCCESS,
    payload: hosts
  }
};

const getHostsFailure = (error) => {
  return {
    type: Actions.GET_HOSTS_FAILURE,
    payload: error
  }
};

const setHostCommand = (hostId, command) => {
  return {
    type: Actions.SET_HOST_COMMAND,
    payload: {
      hostId,
      command
    }
  }
};

const executeCommand = (hostId) => {
  return {
    type: Actions.EXECUTE_COMMAND,
    payload: {
      hostId
    }
  }
};

const executeCommandSuccess = (output) => {
  return {
    type: Actions.EXECUTE_COMMAND_SUCCESS,
    payload: {
      output
    }
  }
};

const executeCommandFailure = (error) => {
  console.log(error);
  return {
    type: Actions.EXECUTE_COMMAND_FAILURE,
    payload: {
      error
    }
  }
};

export {
  getHosts,
  getHostsSuccess,
  getHostsFailure,
  setHostCommand,
  executeCommand,
  executeCommandSuccess,
  executeCommandFailure
}