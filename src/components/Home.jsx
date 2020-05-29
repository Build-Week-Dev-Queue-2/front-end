import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup, Button, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { fetchAllTickets, editTicket } from "../actions/";

import Modal from "./Modal";
import CreateTicketForm from "./Forms/CreateTicketForm";
import TicketDetails from "./TicketDetails";
import TicketList from "./TicketList";
import "./Home.scss";

import { 
  DARK_BLUE,
  BLUE,
  LIGHT_BLUE,
  GREEN,
  RED,
  WHITE,
  GRAY,
  BLACK,
  HIGHLIGHT_BLUE,
  HomeStyledHeader,
  HomeStyledButton
} from '../utils/styles'

import styled from 'styled-components';

export default function Home({ history, match }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const unresolvedTickets = useSelector((state) => {
    return state.tickets.filter((ticket) => ticket.resolved === "false");
  });
  const resolvedTickets = useSelector((state) => {
    return state.tickets.filter((ticket) => ticket.resolved === "true");
  });
  const ticketToEdit = useSelector((state) => state.ticketToEdit);
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
    ticketToEdit.ticket_id && setIsOpen(true);
  }, [ticketToEdit]);

  const closeModal = () => {
    setIsOpen(false);
    dispatch(editTicket({}));
  };

  return (
    <div className="home-wrapper">
      <HomeStyledHeader>
        <ButtonGroup
          onClick={(evt) =>
            history.push(`/home/${evt.target.textContent.toLowerCase()}`)
          }
          variant="text"
          color="primary"
        >
          <HomeStyledButton
            style={{
              backgroundColor:
                match.params.type === "unresolved" && GRAY,
            }}
          >
            Unresolved
          </HomeStyledButton>
          <HomeStyledButton
            style={{
              backgroundColor:
                match.params.type === "resolved" && GRAY,
            }}
          >
            Resolved
          </HomeStyledButton>
        </ButtonGroup>
        <Button variant="contained" color="secondary" disableElevation>
          Logout
        </Button>
      </HomeStyledHeader>
      <main>
        <TicketList
          tickets={
            (match.params.type === "unresolved" && unresolvedTickets) ||
            (match.params.type === "resolved" && resolvedTickets)
          }
        />
        <Modal isOpen={isOpen} setIsOpen={closeModal}>
          {!ticketToEdit.ticket_id ? (
            <CreateTicketForm />
          ) : (
            <TicketDetails ticket={ticketToEdit} />
          )}
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
