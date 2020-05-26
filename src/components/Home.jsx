import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { fetchAllTickets } from "../actions/userActions";
import CreateTicketForm from "./Forms/CreateTicketForm";
import TicketList from "./TicketList";

export default function Home() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const token = useSelector((state) => state.user.token);
  useEffect(() => {
    axiosWithAuth(token)
      .get("/api/tickets")
      .then((res) => {
        dispatch(fetchAllTickets(res.data));
      });
  }, [token, dispatch]);

  return (
    <>
      <TicketList />
      <CreateTicketForm isOpen={isOpen} setIsOpen={setIsOpen} />
      <Fab
        onClick={() => setIsOpen(!isOpen)}
        color="primary"
        style={{ zIndex: 2 }}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
