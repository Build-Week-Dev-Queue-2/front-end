import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchComments } from "../actions/";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Ticket from "./Ticket";


import { StyledTicketWrapper } from '../utils/styles';

export default function TicketList({ tickets }) {
  const dispatch = useDispatch();

  useEffect(() => {
    axiosWithAuth()
      .get("/api/comments")
      .then((res) => dispatch(fetchComments(res.data)))
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <StyledTicketWrapper>
      {tickets.map((ticket) => {
        return <Ticket ticket={ticket} />;
      })}
    </StyledTicketWrapper>
  );
}
