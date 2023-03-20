import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { combineReducers } from "redux";
import { legacy_createStore } from "redux";
import counterReducer from "./redux/reducer/reducer";
import { Provider } from "react-redux";
const allReducers = combineReducers({
  counterReducer,
});
const store = legacy_createStore(allReducers);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
