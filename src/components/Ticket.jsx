import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import { expandTicket, editTicket } from "../actions/";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import moment from 'moment';

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
    <div className='ticket'>
    <Typography
      variant="h5"
      component="h5"
      color="textSecondary"
      gutterBottom
    >
      {ticket.title}
    </Typography>
    <Card className='ticket_card'>
      <CardContent>
      <div>
        <div className='flex'>
          <Typography variant="h5" component="p">
            {ticket.author}
          </Typography>
          <Typography variant="h5" component="p">
            {moment(parseInt(ticket.posted_time)).format('MMMM Do YYYY')}
          </Typography>
        </div>
        <Typography variant="body2" component="p">
          Aut repellat molestias qui. Quae soluta atque est consequuntur eum natus. Qui facilis saepe architecto vero.
 
Fuga labore aut. Harum iure quod a et facere blanditiis architecto possimus. Excepturi ab odit natus asperiores distinctio. Accusantium aut voluptas necessitatibus consequatur tenetur eos magnam soluta eaque. Sapiente ut voluptatem possimus.
 
Quasi nulla doloremque laudantium sed. Et saepe officiis et consequatur. Perspiciatis nisi eos perspiciatis animi voluptas sit temporibus. Et voluptatum deserunt sit et laboriosam enim perferendis qui ex. Quasi eos quo non et delectus nisi earum quibusdam. Ut consequatur occaecati et nobis.
        </Typography>
      </div>
        <div className='flex m-top'>
        <Button
          variant="contained"
          color="secondary"
          className='btn btn-blue'
          disableElevation
          onClick={submitTicketToEdit}
          >
          Open
        </Button>
        {user.role_id === 2 && (
          <Button
            variant="contained"
            className={`btn ${ticket.resolved === 'false' ? 'btn-red' : 'btn-green'}`}
            disableElevation
            onClick={submitMarkResolved}
          >
            {ticket.resolved === "false" ? "Mark Resolved" : "Mark Unresolved"}
          </Button>
        )}
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
