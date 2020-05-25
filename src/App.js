import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginForm from "./components/Forms/LoginForm";
import RegisterForm from "./components/Forms/RegisterForm";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/" component={LoginForm} />
      </Switch>
    </Router>
  );
}

export default App;
