import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function Logout() {
  const history = useHistory();
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    history.push("/login");
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      disableElevation
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
