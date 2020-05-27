import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

export default function Ticket({ ticket }) {
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
      </CardContent>
    </Card>
  );
}
