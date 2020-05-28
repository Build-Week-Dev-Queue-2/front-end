import React from "react";
import { useSelector } from "react-redux";
import {
  CardContent,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  TextField,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

export default function Ticket({ ticket }) {
  const comments = useSelector(
    (state) => state.user.comments[ticket.ticket_id]
  );

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
        <form>
          <TextField
            name="message"
            label="Message"
            variant="outlined"
            style={{ width: "100%" }}
          />
        </form>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
