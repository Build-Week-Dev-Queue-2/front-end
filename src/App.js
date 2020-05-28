import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";
import LoginForm from "./components/Forms/LoginForm";
import RegisterForm from "./components/Forms/RegisterForm";
import Home from "./components/Home";

function App() {
  const history = useHistory();
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      history.push("/home/unresolved");
    }
  }, [history]);

  return (
    <Switch>
      <PrivateRoute path="/home/:type" component={Home} />
      <Route path="/register" component={RegisterForm} />
      <Route path="/login" component={LoginForm} />
      <Route path="/" component={LoginForm} />
    </Switch>
  );
}

export default App;
