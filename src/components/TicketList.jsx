import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import Ticket from "./Ticket";

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
        return <Ticket ticket={ticket} />;
      })}
    </>
  );
}
