import {put, select, takeLatest} from "redux-saga/effects";
import fetcher from "../api/fetcher";
import {Actions, hostProperties} from "../constants";
import {urls} from "../api/urls";
import {getHostsSuccess, getHostsFailure, executeCommandSuccess, executeCommandFailure} from "../actions";
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

  const {payload} = action;
  const {hostId} = payload;
  const hosts = yield select(getHost);
  const command = _.get(_.find(hosts, {id: hostId}), "host_command");
  const property = hostProperties.commandProperties[command];

  try {
    const response = yield fetcher.patch(`${urls.hosts}/${hostId}/execute_bash_command/`, {command, property});
    if (!_.isEmpty(response.output)) {
      console.log("Success");
      yield put(executeCommandSuccess(response.output));
    } else {
      console.log("Failure");
      yield put(executeCommandSuccess(response.error))
    }
  } catch (error) {
    yield put(executeCommandFailure(error));
  }
}

export function* hostsSagas() {
  yield takeLatest(Actions.GET_HOSTS, getHosts);
  yield takeLatest(Actions.EXECUTE_COMMAND, executeCommand);
}