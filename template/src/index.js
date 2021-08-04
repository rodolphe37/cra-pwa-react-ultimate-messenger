import React from "react";

import ReactDom from "react-dom";
import { RecoilRoot } from "recoil";
import "./i18n";
import App from "./App";
import { positions, Provider } from "react-alert";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import AlertTemplate from "react-alert-template-basic";
import { BrowserRouter as Router } from "react-router-dom";

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER,
};

ReactDom.render(
  <Router>
    <RecoilRoot>
      <Provider template={AlertTemplate} {...options}>
        <App />
      </Provider>
    </RecoilRoot>
  </Router>,
  document.querySelector("#root")
);
serviceWorkerRegistration.register();
