import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CardContent,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
  Button,
} from "@material-ui/core";
import { createComment, markResolved } from "../actions/";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function Ticket({ ticket }) {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments[ticket.ticket_id]);
  const user = useSelector((state) => state.user);
  const [message, setMessage] = useState("");

  const submitComment = (evt) => {
    evt.preventDefault();
    const comment = {
      author: user.user_id,
      message: message,
      ticket_id: ticket.ticket_id,
    };

    axiosWithAuth()
      .post("/api/comments", comment)
      .then((res) => {
        console.log(res.data);
        dispatch(createComment(res.data));
      })
      .catch((err) => console.log(err));
  };

  const submitMarkResolved = (evt) => {
    evt.stopPropagation();

    const resolvedTicket = {
      resolved: "true",
      resolved_by: user.user_id,
      resolved_time: Date.now(),
    };

    console.log({ resolvedTicket });

    axiosWithAuth()
      .put(`/api/tickets/${ticket.ticket_id}`, resolvedTicket)
      .then((res) => {
        console.log(res.data);
        dispatch(markResolved(res.data));
      })
      .catch((err) => console.log(err.response.data.message));
  };

  return (
    <ExpansionPanel style={{ overflowX: "hidden" }}>
      <ExpansionPanelSummary>
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
          {ticket.resolved === "false" && user.role_id === 2 && (
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              onClick={submitMarkResolved}
            >
              Mark Resolved
            </Button>
          )}
        </CardContent>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails
        style={{ display: "flex", flexDirection: "column" }}
      >
        {comments &&
          comments.map((comment) => {
            return (
              <Typography>{`${comment.author}: ${comment.message}`}</Typography>
            );
          })}
        <form onSubmit={submitComment}>
          <TextField
            name="message"
            label="Message"
            variant="outlined"
            style={{ width: "100%" }}
            onChange={(evt) => setMessage(evt.target.value)}
          />
        </form>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
