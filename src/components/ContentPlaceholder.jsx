import React from "react";

export default function ContentPlaceholder({ height, children }) {
  return (
    <div
      style={{
        width: "90%",
        height: `${height}rem`,
        backgroundColor: "#ccc",
        padding: "0.25rem 0",
        margin: "0.5rem auto",
      }}
    ></div>
  );
}
