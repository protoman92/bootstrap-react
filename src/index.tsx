import App from "component/App/component";
import "index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { thunkUnwrapMiddleware } from "redux/middleware";
import createReducer from "redux/reducer";
import * as serviceWorker from "serviceWorker";
import { BrowserRouter } from "react-router-dom";

if (process.env.NODE_ENV !== "production") {
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React);
}

const reducer = createReducer();

const store = createStore(
  reducer,
  applyMiddleware(
    thunkUnwrapMiddleware(),
    thunkMiddleware.withExtraArgument({})
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
