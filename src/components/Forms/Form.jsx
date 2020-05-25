import React from "react";
import { Paper, Backdrop } from "@material-ui/core";
import "./Form.scss";

export default function Form(props) {
  return (
    <Backdrop open={true}>
      <Paper className="form-container">
        <form onSubmit={props.handleSubmit} className="form">
          <h1 className="form-item">{props.title}</h1>
          {props.children}
        </form>
      </Paper>
      ;
    </Backdrop>
  );
}
