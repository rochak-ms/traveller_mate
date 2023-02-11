import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayjsUtils from "dayjs";

ReactDOM.render(
  <MuiPickersUtilsProvider utils={DayjsUtils}>
    <App />
  </MuiPickersUtilsProvider>,
  document.querySelector("#root")
);

serviceWorker.register();
