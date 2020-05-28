import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Button, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { fetchAllTickets } from "../actions/";
import CreateTicketForm from "./Forms/CreateTicketForm";
import TicketList from "./TicketList";
import "./Home.scss";

export default function Home({ history, match }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const { type } = match.params;

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
          onClick={(evt) =>
            history.push(`/home/${evt.target.textContent.toLowerCase()}`)
          }
          variant="text"
          color="primary"
        >
          <Button
            style={{
              backgroundColor: type === "unresolved" && "rgba(0,0,0,0.1)",
            }}
          >
            Unresolved
          </Button>
          <Button
            style={{
              backgroundColor: type === "resolved" && "rgba(0,0,0,0.1)",
            }}
          >
            Resolved
          </Button>
        </ButtonGroup>
      </header>
      <main>
        <TicketList
          tickets={
            (type === "unresolved" && openTickets) ||
            (type === "resolved" && resolvedTickets)
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
