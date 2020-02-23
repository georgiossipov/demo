import _ from "lodash";
import {Actions} from "../constants";
import {cloneState} from "./stateHelpers";

export const getHostsSuccess = (state, action) => {
  const {clonedState, payload} = cloneState(state, action);
  clonedState.list = payload;
  return clonedState;
};

export const getHostsFailure = (state, action) => {
  const {clonedState, payload} = cloneState(state, action);
  clonedState.errors[Actions.GET_HOSTS_FAILURE] = payload.message;
  return clonedState;
};

export const createHostSuccess = (state, action) => {
  const {clonedState, payload} = cloneState(state, action);
  clonedState.list.push(payload.hostData);
  clonedState.form.open = false;
  return clonedState;
};

export const deleteHostSuccess = (state, action) => {
  const {clonedState, payload} = cloneState(state, action);
  _.remove(clonedState.list, {id: payload.hostId});
  return clonedState;
};

export const showHostForm = (state, action) => {
  const {clonedState, payload} = cloneState(state, action);
  clonedState.form.open = payload.open;
  return clonedState;
};

export const setHostCommand = (state, action) => {
  const {clonedState, payload} = cloneState(state, action);
  _.forEach(clonedState.list, host => {
    if (host.id === payload.hostId) {
      host.command = !_.isEmpty(payload.command) ? payload.command : null;
    }
  });
  return clonedState;
};

export const executeHostCommand = (state, action) => {
  const {clonedState, payload} = cloneState(state, action);
  _.forEach(clonedState.list, host => {
    if (host.id === payload.hostId) {
      host.data = {...host.data, ...payload.output};
      host.command = null;
    }
  });
  return clonedState;
};