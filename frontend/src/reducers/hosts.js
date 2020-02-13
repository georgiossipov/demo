import {Actions} from "../lib/constants";
import cloneDeep from "lodash/cloneDeep";

const initialState = {
  list: [],
  error: ''
};

const hosts = (state = initialState, action) => {
  switch (action.type) {
    case Actions.GET_HOSTS_SUCCESS: {
      const clonedState = cloneDeep(state);
      const {payload} = action;
      clonedState.list = payload;
      return clonedState;
    }
    case Actions.GET_HOSTS_FAILURE: {
      const clonedState = cloneDeep(state);
      const {payload} = action;
      clonedState.error = payload.message;
      return clonedState;
    }
    default: {
      return state;
    }
  }
};

export default hosts;