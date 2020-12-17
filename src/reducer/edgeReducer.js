import { createAction, createReducer } from "@reduxjs/toolkit";

export const addEdge = createAction("edge/add");
export const removeEdge = createAction("edge/remove");

const initialState = [];

export const edgeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addEdge, (state, action) => {
      if (!state.find((v, i, a) => v.id === action.payload.id)) {
        state.push(action.payload);
      }
    })
    .addCase(removeEdge, (state, action) => {
      return state.filter((v, i, a) => v.id !== action.payload);
    });
});

export default edgeReducer;
