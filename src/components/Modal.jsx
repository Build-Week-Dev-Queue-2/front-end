import React from "react";
import { Paper, Backdrop, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import "./Modal.scss";

export default function Form({ isOpen, setIsOpen, children }) {
  return (
    isOpen && (
      <Backdrop open={isOpen} style={{ zIndex: 1 }}>
        <Paper className="modal-container">
          <Button onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </Button>
          {children}
        </Paper>
      </Backdrop>
    )
  );
}
