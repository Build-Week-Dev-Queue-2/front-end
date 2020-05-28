import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  const token = useSelector((state) => state.token);

  return (
    <Route
      {...rest}
      render={() => {
        return token ? <Component /> : <Redirect to="/login" />;
      }}
    />
  );
}
