import {Actions} from "../constants";
import _ from "lodash";

const initialState = {
  list: []
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
    default: {
      return state;
    }
  }
};

export default hosts;