import {Actions, hostProperties} from "../constants";
import {getHostsSuccess, getHostsFailure, createHostSuccess, deleteHostSuccess,
setHostCommand, executeHostCommand, showHostForm} from "../helpers";

const initialState = {
  list: [],
  form: hostProperties.form,
  errors: {}
};

const hosts = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_HOSTS_SUCCESS: {
      return getHostsSuccess(state, action);
    }
    case Actions.GET_HOSTS_FAILURE: {
      return getHostsFailure(state, action);
    }
    case Actions.SET_HOST_COMMAND: {
      return setHostCommand(state, action);
    }
    case Actions.EXECUTE_COMMAND_SUCCESS: {
      return executeHostCommand(state, action);
    }
    case Actions.SHOW_HOST_FORM: {
      return showHostForm(state, action);
    }
    case Actions.CREATE_HOST_SUCCESS: {
      return createHostSuccess(state, action );
    }
    case Actions.DELETE_HOST_SUCCESS: {
      return deleteHostSuccess(state, action);
    }
    default: {
      return state;
    }
  }
};

export default hosts;