import React, { useState, useEffect } from "react";
import { Paper, Backdrop, ClickAwayListener } from "@material-ui/core";
import "./Modal.scss";

export default function Form({ startOpen = false, children }) {
  const [isOpen, setIsOpen] = useState(startOpen);

  useEffect(() => {
    setIsOpen(startOpen);
  }, [startOpen]);

  return (
    <Backdrop open={isOpen} style={{ zIndex: 1 }}>
      <ClickAwayListener onClickAway={() => setIsOpen(false)}>
        <Paper className="modal-container">{children}</Paper>
      </ClickAwayListener>
    </Backdrop>
  );
}
