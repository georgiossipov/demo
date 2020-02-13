import {all} from "redux-saga/effects";
import {getHostsSaga} from "./hosts";

export default function* rootSaga() {
  yield all(
    [
      getHostsSaga()
    ]
  );
}