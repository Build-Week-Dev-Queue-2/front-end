import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import { expandTicket, editTicket } from "../actions/";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import moment from "moment";

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
    <div className="ticket">
      <Typography
        variant="h5"
        component="h5"
        color="textSecondary"
        gutterBottom
      >
        {ticket.title}
      </Typography>
      <Card className="ticket_card">
        <CardContent>
          <div>
            <div className="flex">
              <Typography variant="h5" component="p">
                {ticket.author}
              </Typography>
              <Typography variant="h5" component="p">
                {moment(parseInt(ticket.posted_time)).format("MMMM Do YYYY")}
              </Typography>
            </div>
            <Typography variant="body2" component="p">
              {ticket.content}
            </Typography>
          </div>
          <div className="flex m-top">
            <Button
              variant="contained"
              color="secondary"
              className="btn btn-blue"
              disableElevation
              onClick={submitTicketToEdit}
            >
              Open
            </Button>
            {user.role_id === 2 && (
              <Button
                variant="contained"
                className={`btn ${
                  ticket.resolved === "false" ? "btn-red" : "btn-green"
                }`}
                disableElevation
                onClick={markResolved}
              >
                {ticket.resolved === "false"
                  ? "Mark Resolved"
                  : "Mark Unresolved"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
