import {all} from "redux-saga/effects";
import {hostsSagas} from "./hosts";

export default function* rootSaga() {
  yield all(
    [
      hostsSagas()
    ]
  );
}