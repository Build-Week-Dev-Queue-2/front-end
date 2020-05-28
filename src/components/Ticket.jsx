import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CardContent,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { createComment } from "../actions/userActions";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export default function Ticket({ ticket }) {
  const dispatch = useDispatch();
  const comments = useSelector(
    (state) => state.user.comments[ticket.ticket_id]
  );
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user.user_id);
  const [message, setMessage] = useState("");

  const submitComment = (evt) => {
    evt.preventDefault();
    const comment = {
      author: userId,
      message: message,
      ticket_id: ticket.ticket_id,
    };

    axiosWithAuth(token)
      .post("/api/comments", comment)
      .then((res) => {
        console.log(res.data);
        dispatch(createComment(res.data));
      })
      .catch((err) => console.log(err));
  };

  return (
    <ExpansionPanel style={{ overflowX: "hidden" }}>
      <ExpansionPanelSummary expandIcon={<ExpandMore />}>
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
