import "antd/dist/antd.css";
import "bootstrap-react-essentials/dist/global";
import {
  createBaseClient,
  createRelativeClient
} from "bootstrap-react-essentials/dist/http/client";
import thunkUnwrapMiddleware from "bootstrap-react-essentials/dist/redux/middleware/thunkUnwrap";
import { createURLDataSyncRepository } from "bootstrap-react-essentials/dist/repository/dataRepository";
import App from "component/App/component";
import "index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import createReducer from "redux/reducer";
import * as serviceWorker from "serviceWorker";

if (process.env.NODE_ENV !== "production") {
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React);
}

const reducer = createReducer();
const baseHTTPClient = createBaseClient();
const relativeClient = createRelativeClient(window, baseHTTPClient);

const repository: Repository = {
  urlDataSync: createURLDataSyncRepository(window, relativeClient)
};

const store = createStore(
  reducer,
  { repository },
  applyMiddleware(
    thunkUnwrapMiddleware(),
    thunkMiddleware.withExtraArgument(repository)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
