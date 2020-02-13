import {Actions} from "../lib/constants";

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

export {
  getHosts,
  getHostsSuccess,
  getHostsFailure
}