import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import SignIn from "layouts/signin";
import SignUp from "layouts/signup";
import Dashboard from "views/admin/Dashboard";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/signup" exact component={SignUp} />
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" exact component={Dashboard} />
      {/* <Route path="/passwordReset" component={passwordReset} /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);
