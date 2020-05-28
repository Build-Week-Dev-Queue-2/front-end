import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchComments } from "../actions/";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import Ticket from "./Ticket";

export default function TicketList({ tickets }) {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    axiosWithAuth(token)
      .get("/api/comments")
      .then((res) => dispatch(fetchComments(res.data)))
      .catch((err) => console.log(err));
  }, [token, dispatch]);

  return (
    <>
      {tickets.map((ticket) => {
        return <Ticket ticket={ticket} />;
      })}
    </>
  );
}
