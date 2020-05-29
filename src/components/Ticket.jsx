import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import { editTicket, createComment, markResolved } from "../actions/";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import moment from 'moment';

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

  const submitTicketToEdit = () => dispatch(editTicket(ticket));
  
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
            {ticket.resolved === "false" ? "Mark Resolved" : "Unmark Resolved"}
          </Button>
        )}
        </div>
      </CardContent>
    </Card>
    </div>
  );
}
