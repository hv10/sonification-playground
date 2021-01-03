import { createAction, createReducer } from "@reduxjs/toolkit";

export const addEdge = createAction("edge/add");
export const removeEdge = createAction("edge/remove");
export const removeConnectedEdges = createAction("edge/removeConnected");
export const replaceState = createAction("edge/replaceState");

const initialState = [];

export const edgeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addEdge, (state, action) => {
      if (!state.find((v) => v.id === action.payload.id)) {
        state.push(action.payload);
      }
    })
    .addCase(removeEdge, (state, action) => {
      return state.filter((v) => v.id !== action.payload);
    })
    .addCase(removeConnectedEdges, (state, action) => {
      return state.filter((v) => v.source !== action.payload);
    })
    .addCase(replaceState, (state, action) => {
      if (action.payload) {
        return [...action.payload];
      }
    });
});

export default edgeReducer;
