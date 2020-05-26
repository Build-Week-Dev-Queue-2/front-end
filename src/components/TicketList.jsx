import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function TicketList() {
  const tickets = useSelector((state) => {
    const sortedTickets = state.user.tickets.sort((a, b) => {
      return b.posted_time - a.posted_time;
    });
    return sortedTickets;
  });

  useEffect(() => {
    console.log({ tickets });
  }, [tickets]);

  return (
    <>
      {tickets.map((ticket) => {
        return (
          <div key={ticket.ticked_id}>
            <h2>{ticket.title}</h2>
            <p>{ticket.content}</p>
            <span>{ticket.author}</span>
            <span>{ticket.category}</span>
          </div>
        );
      })}
    </>
  );
}
