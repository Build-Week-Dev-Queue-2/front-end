import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Button, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { fetchAllTickets } from "../actions/";
import CreateTicketForm from "./Forms/CreateTicketForm";
import TicketList from "./TicketList";
import "./Home.scss";

export default function Home() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("Open");
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const openTickets = useSelector((state) => {
    return state.tickets.filter((ticket) => ticket.resolved === "false");
  });
  const resolvedTickets = useSelector((state) => {
    return state.tickets.filter((ticket) => ticket.resolved === "true");
  });

  useEffect(() => {
    axiosWithAuth(token)
      .get("/api/tickets")
      .then((res) => {
        const data =
          user.role_id === 1
            ? res.data.filter((ticket) => ticket.author === user.username)
            : res.data;
        dispatch(fetchAllTickets(data));
      });
  }, [token, dispatch, user]);

  return (
    <div className="home-wrapper">
      <header>
        <ButtonGroup
          onClick={(evt) => setTab(evt.target.textContent)}
          variant="text"
          color="primary"
        >
          <Button
            style={{ backgroundColor: tab === "Open" && "rgba(0,0,0,0.1)" }}
          >
            Open
          </Button>
          <Button
            style={{ backgroundColor: tab === "Resolved" && "rgba(0,0,0,0.1)" }}
          >
            Resolved
          </Button>
        </ButtonGroup>
      </header>
      <main>
        <TicketList
          tickets={
            (tab === "Open" && openTickets) ||
            (tab === "Resolved" && resolvedTickets)
          }
        />
        <CreateTicketForm isOpen={isOpen} setIsOpen={setIsOpen} />
      </main>
      <footer>
        <Fab onClick={() => setIsOpen(!isOpen)} color="primary">
          <AddIcon />
        </Fab>
      </footer>
    </div>
  );
}
