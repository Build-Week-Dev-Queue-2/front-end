import React, { useEffect } from "react";

import Ticket from "./Ticket";

export default function TicketList({ tickets }) {
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
