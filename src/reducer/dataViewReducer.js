import { createAction, createReducer } from "@reduxjs/toolkit";

export const addDataview = createAction("dataView/add");
export const removeDataview = createAction("dataView/remove");

const initialState = [];

export const dataviewReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addDataview, (state, action) => {
      if (!state.find((v, i, a) => v.id === action.payload.id)) {
        state.push(action.payload);
      }
    })
    .addCase(removeDataview, (state, action) => {
      return state.filter((v, i, a) => v.id !== action.payload);
    });
});

export default dataviewReducer;
