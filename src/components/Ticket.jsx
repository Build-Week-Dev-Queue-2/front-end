import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  Typography,
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
  const [isResolved, setIsResolved] = useState(false);

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

    setIsResolved(!isResolved);

    const resolvedTicket = {
      resolved: isResolved ? "true" : "false",
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
        {user.role_id === 2 && (
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            onClick={submitMarkResolved}
          >
            {ticket.resolved === "false" ? "Mark Resolved" : "Unmark Resolved"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
