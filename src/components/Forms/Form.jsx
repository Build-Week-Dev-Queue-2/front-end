import React from "react";
import { Paper, Backdrop } from "@material-ui/core";
import "./Form.scss";

export default function Form({ isOpen = true, title, handleSubmit, children }) {
  return (
    <Backdrop open={isOpen} style={{ zIndex: 1 }}>
      <Paper className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h1 className="form-item">{title}</h1>
          {children}
        </form>
      </Paper>
    </Backdrop>
  );
}
