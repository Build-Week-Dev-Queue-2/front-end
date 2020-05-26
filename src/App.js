import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/Forms/LoginForm";
import RegisterForm from "./components/Forms/RegisterForm";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/home" component={Home} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/" component={LoginForm} />
      </Switch>
    </Router>
  );
}

export default App;
