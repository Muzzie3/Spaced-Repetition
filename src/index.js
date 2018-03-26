import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducers from "./reducers/CombinedReducers";
import "./style/index.css";
import "./style/App.css";
import Root from "./components/App";

ReactDOM.render(
  React.createElement(
    Provider,
    { store: createStore(Reducers, {}) },
    React.createElement(Root),
  ),
  document.getElementById("root"),
);
