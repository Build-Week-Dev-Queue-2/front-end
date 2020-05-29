import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Button, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { fetchAllTickets, expandTicket } from "../actions/";

import Logout from "./Logout";
import Modal from "./Modal";
import CreateTicketForm from "./Forms/CreateTicketForm";
import TicketExpanded from "./TicketExpanded";
import TicketList from "./TicketList";
import "./Home.scss";

export default function Home({ history, match }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const unresolvedTickets = useSelector((state) => {
    return state.tickets.filter((ticket) => ticket.resolved === "false");
  });
  const resolvedTickets = useSelector((state) => {
    return state.tickets.filter((ticket) => ticket.resolved === "true");
  });
  const expandedTicketId = useSelector((state) => state.expandedTicketId);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/tickets")
      .then((res) => {
        const data =
          user.role_id === 1
            ? res.data.filter((ticket) => ticket.author === user.username)
            : res.data;
        dispatch(fetchAllTickets(data));
      });
  }, [user, dispatch]);

  useEffect(() => {
    expandedTicketId ? setIsOpen(true) : setIsOpen(false);
  }, [expandedTicketId]);

  const closeModal = () => {
    setIsOpen(false);
    dispatch(expandTicket(null));
  };

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
              backgroundColor:
                match.params.type === "unresolved" && "rgba(0,0,0,0.1)",
            }}
          >
            Unresolved
          </Button>
          <Button
            style={{
              backgroundColor:
                match.params.type === "resolved" && "rgba(0,0,0,0.1)",
            }}
          >
            Resolved
          </Button>
        </ButtonGroup>
        <Logout />
      </header>
      <main>
        <TicketList
          tickets={
            (match.params.type === "unresolved" && unresolvedTickets) ||
            (match.params.type === "resolved" && resolvedTickets)
          }
        />
        <Modal isOpen={isOpen} setIsOpen={closeModal}>
          {!expandedTicketId ? <CreateTicketForm /> : <TicketExpanded />}
        </Modal>
      </main>
      <footer>
        <Fab onClick={() => setIsOpen(true)} color="primary">
          <AddIcon />
        </Fab>
      </footer>
    </div>
  );
}
