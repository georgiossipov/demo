import React from "react";
import {render} from "react-dom";
import "babel-polyfill"
import "regenerator-runtime/runtime"
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import {composeWithDevTools} from "redux-devtools-extension";
import App from "./components/app";

import "semantic-ui-css/semantic.min.css";
import "./index.scss";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById("app")
);