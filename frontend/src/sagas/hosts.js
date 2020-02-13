import {call, put, takeLatest} from "redux-saga/effects";
import fetcher from "../api/fetcher";
import {Actions} from "../lib/constants";
import {getHostsSuccess, getHostsFailure} from "../actions/hosts";

export function* getHosts() {

  try {
    const hosts = yield fetcher.get('http://127.0.0.1:8000/api/hosts');
    yield put(getHostsSuccess(hosts))
  } catch (error) {
    yield put(getHostsFailure(error))
  }
}


export function* getHostsSaga() {
  yield takeLatest(Actions.GET_HOSTS, getHosts);
}