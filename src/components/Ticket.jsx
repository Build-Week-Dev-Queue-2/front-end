import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import { expandTicket, editTicket } from "../actions/";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function Ticket({ ticket }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const markResolved = () => {
    const resolvedTicket = {
      resolved: ticket.resolved === "true" ? "false" : "true",
      resolved_by: user.user_id,
      resolved_time: Date.now(),
    };
    axiosWithAuth()
      .put(`/api/tickets/${ticket.ticket_id}`, resolvedTicket)
      .then((res) => {
        dispatch(editTicket(res.data));
      })
      .catch((err) => console.log(err.response.data.message));
  };

  const submitTicketToEdit = () => dispatch(expandTicket(ticket.ticket_id));

  return (
    <Card>
      <CardContent>
        <Typography
          variant="h2"
          component="h2"
          color="textSecondary"
          gutterBottom
        >
          {ticket.title}
        </Typography>
        <Typography variant="body2" component="p">
          {ticket.content}
        </Typography>
        <Typography variant="h5" component="h3">
          {ticket.author}
        </Typography>
        <Typography variant="h5" component="h3">
          {ticket.category}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          onClick={submitTicketToEdit}
        >
          Open
        </Button>
        {user.role_id === 2 && (
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={markResolved}
          >
            {ticket.resolved === "false" ? "Mark Resolved" : "Mark Unresolved"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
