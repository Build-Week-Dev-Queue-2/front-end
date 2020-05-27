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
  const token = useSelector((state) => state.user.token);
  const tickets = useSelector((state) => {
    return state.user.tickets.sort((a, b) => {
      return b.posted_time - a.posted_time;
    });
  });
  useEffect(() => {
    axiosWithAuth(token)
      .get("/api/tickets")
      .then((res) => {
        dispatch(fetchAllTickets(res.data));
      });
  }, [token, dispatch]);

  return (
    <div className="home-wrapper">
      <header>
        <ButtonGroup variant="text" color="primary">
          <Button>Open</Button>
          <Button>Resolved</Button>
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

  // return (
  //   <>
  //     <TicketList tickets={tickets} />
  //     <CreateTicketForm isOpen={isOpen} setIsOpen={setIsOpen} />
  //     <Fab
  //       onClick={() => setIsOpen(!isOpen)}
  //       color="primary"
  //       style={{ zIndex: 2 }}
  //     >
  //       <AddIcon />
  //     </Fab>
  //   </>
  // );
}
