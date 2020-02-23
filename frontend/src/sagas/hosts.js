import {put, select, takeLatest} from "redux-saga/effects";
import fetcher from "../api/fetcher";
import {Actions, hostProperties} from "../constants";
import {urls} from "../api/urls";
import {
  getHostsSuccess, getHostsFailure, executeCommandSuccess, executeCommandFailure,
  createHostSuccess, createHostFailure, deleteHostSuccess, deleteHostFailure
} from "../actions";
import {enrichHostData} from "../helpers";
import _ from "lodash";

const getHost = state => state.app.hosts.list;

export function* getHosts() {

  try {
    const hosts = yield fetcher.get(urls.hosts);
    const enrichedHosts = enrichHostData(hosts);
    yield put(getHostsSuccess(enrichedHosts))
  } catch (error) {
    yield put(getHostsFailure(error))
  }
}

export function* executeCommand(action) {

  const {hostId} = action.payload;
  const hosts = yield select(getHost);
  const command = _.get(_.find(hosts, {id: hostId}), "command");
  const property = hostProperties.commandProperties[command];

  try {
    const response = yield fetcher.patch(`${urls.hosts}/${hostId}/execute_bash_command/`, {command, property});
    if (!_.isEmpty(response.error)) {
      yield put(executeCommandFailure(response.error));
    } else {
      yield put(executeCommandSuccess(hostId, response))
    }
  } catch (error) {
    yield put(executeCommandFailure(error));
  }
}

export function* createHost(action) {

  const {formData} = action.payload;
  const {ipv4_address, ssh_port, username, password} = formData;

  try {
    const response = yield fetcher.post(`${urls.hosts}/`, {ipv4_address, ssh_port, username, password})
    yield put(createHostSuccess(response));
  } catch (error) {
    yield put(createHostFailure(error));
  }
}

export function* deleteHost(action) {

  const {hostId} = action.payload;

  try {
    yield fetcher.delete(`${urls.hosts}/${hostId}/`);
    yield put(deleteHostSuccess(hostId));
  } catch (error) {
    yield put(deleteHostFailure(error));
  }
}

export function* hostsSagas() {
  yield takeLatest(Actions.GET_HOSTS, getHosts);
  yield takeLatest(Actions.CREATE_HOST, createHost);
  yield takeLatest(Actions.DELETE_HOST, deleteHost);
  yield takeLatest(Actions.EXECUTE_COMMAND, executeCommand);
}