import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Button, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { fetchAllTickets } from "../actions/userActions";
import CreateTicketForm from "./Forms/CreateTicketForm";
import TicketList from "./TicketList";
import "./Home.scss";

export default function Home() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState("Open");
  const token = useSelector((state) => state.user.token);
  const openTickets = useSelector((state) => state.user.openTickets);
  const resolvedTickets = useSelector((state) => state.user.resolvedTickets);
  const [tickets, setTickets] = useState(openTickets);

  useEffect(() => {
    axiosWithAuth(token)
      .get("/api/tickets")
      .then((res) => {
        dispatch(fetchAllTickets(res.data));
      });
  }, [token, dispatch]);

  useEffect(() => {
    const sortedTickets = (array) =>
      array.sort((a, b) => {
        return b.posted_time - a.posted_time;
      });
    if (tab === "Open") {
      setTickets(sortedTickets(openTickets));
    } else if (tab === "Resolved") {
      setTickets(sortedTickets(resolvedTickets));
    }
  }, [tab, openTickets, resolvedTickets, tickets]);

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
        <TicketList tickets={tickets} />
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