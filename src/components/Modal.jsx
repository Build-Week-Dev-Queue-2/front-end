import React from "react";
import { Paper, Backdrop, ClickAwayListener } from "@material-ui/core";
import "./Modal.scss";

export default function Form({ isOpen, setIsOpen, children }) {
  return (
    isOpen && (
      <Backdrop open={isOpen} style={{ zIndex: 1 }}>
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <Paper className="modal-container">{children}</Paper>
        </ClickAwayListener>
      </Backdrop>
    )
  );
}
