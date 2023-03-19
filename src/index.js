import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";
import SignIn from "views/Auth/SignIn";

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path={`/login`} component={SignIn} />
      <Route path={`/admin`} component={AdminLayout} />
      <Redirect from={`/`} to="/admin/dashboard" />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
