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

const createHost = (formData) => {
  return {
    type: Actions.CREATE_HOST,
    payload: {
      formData
    }
  }
};

const createHostSuccess = (hostData) => {
  return {
    type: Actions.CREATE_HOST_SUCCESS,
    payload: {
      hostData
    }
  }
};

const createHostFailure = (error) => {
  return {
    type: Actions.CREATE_HOST_FAILURE,
    payload: {
      error
    }
  }
};

const deleteHost = (hostId) => {
  return {
    type: Actions.DELETE_HOST,
    payload: {
      hostId
    }
  }
};

const deleteHostSuccess = (hostId) => {
  return {
    type: Actions.DELETE_HOST_SUCCESS,
    payload: {
      hostId
    }
  }
};

const deleteHostFailure = (error) => {
  return {
    type: Actions.DELETE_HOST_FAILURE,
    payload: {
      error
    }
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

const executeCommandSuccess = (hostId, output) => {
  return {
    type: Actions.EXECUTE_COMMAND_SUCCESS,
    payload: {
      hostId,
      output
    }
  }
};

const executeCommandFailure = (error) => {
  return {
    type: Actions.EXECUTE_COMMAND_FAILURE,
    payload: {
      error
    }
  }
};

const showHostForm = (open) => {
  return {
    type: Actions.SHOW_HOST_FORM,
    payload: {
      open
    }
  }
};

export {
  getHosts,
  getHostsSuccess,
  getHostsFailure,
  createHost,
  createHostSuccess,
  createHostFailure,
  deleteHost,
  deleteHostSuccess,
  deleteHostFailure,
  setHostCommand,
  executeCommand,
  executeCommandSuccess,
  executeCommandFailure,
  showHostForm
}