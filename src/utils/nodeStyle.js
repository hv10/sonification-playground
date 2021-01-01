import { findByLabelText } from "@testing-library/react";
import React from "react";
import { createUseStyles } from "react-jss";
import colors from "./colors";

const useNodeStyles = createUseStyles({
  background: {
    backgroundColor: "white",
    padding: 5,
    border: "2px solid",
    borderRadius: 5,
    borderColor: (props) => props.color,
  },
  content: {
    padding: 5,
  },
  handle: {
    transform: "scale(1.5)",
    transition: "0.15s ease-in-out",
    backgroundColor: (props) => (props.color ? props.color : "#555"),
  },
  header: {
    display: "flex",
    justifyConten: "space-between",
  },
});

export { useNodeStyles };
