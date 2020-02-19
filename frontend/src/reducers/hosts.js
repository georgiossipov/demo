import {Actions, hostProperties} from "../constants";
import _ from "lodash";
import {whenMapStateToPropsIsMissing} from "react-redux/lib/connect/mapStateToProps";

const initialState = {
  list: [],
  form: hostProperties.form
};

const hosts = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_HOSTS_SUCCESS: {
      const clonedState = _.cloneDeep(state);
      const {payload} = action;
      clonedState.list = payload;
      clonedState.error = "";
      return clonedState;
    }
    case Actions.GET_HOSTS_FAILURE: {
      const clonedState = _.cloneDeep(state);
      const {payload} = action;
      clonedState.error = payload.message;
      return clonedState;
    }
    case Actions.SET_HOST_COMMAND: {
      const clonedState = _.cloneDeep(state);
      const {payload} = action;
      const {hostId, command} = payload;
      _.forEach(clonedState.list, host => {
        if(host.id === hostId) {
          host.host_command = !_.isEmpty(command) ? command : null;
        }
      });
      return clonedState;
    }
    case Actions.EXECUTE_COMMAND_SUCCESS: {
      const clonedState = _.cloneDeep(state);
      const {payload} = action;
      const {hostId, output} = payload;
      _.forEach(clonedState.list, host => {
        if (host.id === hostId) {
          host.data = {...host.data, ...output}
        }
      });
      console.log(clonedState);
      return clonedState;
    }
    case Actions.SHOW_HOST_FORM: {
      const clonedState = _.cloneDeep(state);
      const {payload} = action;
      const {open} = payload;
      clonedState.form.open = open;
      return clonedState;
    }
    case Actions.CREATE_HOST_SUCCESS: {
      const clonedState = _.cloneDeep(state);
      const {hostData} = action.payload;
      clonedState.list.push(hostData);
      clonedState.form.open = false;
      return clonedState;
    }
    case Actions.DELETE_HOST_SUCCESS: {
      const clonedState = _.cloneDeep(state);
      const {hostId} = action.payload;
      _.remove(clonedState.list, {id: hostId});
      return clonedState;
    }
    default: {
      return state;
    }
  }
};

export default hosts;