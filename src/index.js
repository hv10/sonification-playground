import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import nodeReducer from "./reducer/nodeReducer";
import edgeReducer from "./reducer/edgeReducer";
const initialState = {
  nodes: [
    {
      id: "3",
      targetPosition: "left",
      sourcePosition: "right",
      type: "audioOut",
      data: {
        label: "Audio Label 1",
        onMuteToggle: (e) => {
          console.log(e);
        },
      },
      position: { x: 0, y: 200 },
    },
    {
      id: "5",
      targetPosition: "left",
      sourcePosition: "right",
      type: "graphNode",
      data: {
        label: "Graph Label 1",
        onChange: (event) => {
          console.log(event.target.value);
        },
      },
      position: { x: 150, y: 200 },
    },
    {
      id: "8",
      targetPosition: "left",
      sourcePosition: "right",
      type: "csvInput",
      data: {
        label: "CSV Label 1",
        onChange: (event) => {
          console.log(event.target.value);
        },
      },
      position: { x: 300, y: 200 },
    },
    {
      id: "4",
      targetPosition: "left",
      sourcePosition: "right",
      type: "synthNode",
      data: {
        label: "Synth Label 1",
        onChange: (event) => {
          console.log(event.target.value);
        },
      },
      position: { x: 450, y: 200 },
    },
  ],
};
const reducer = {
  nodes: nodeReducer,
  edges: edgeReducer,
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: initialState,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
