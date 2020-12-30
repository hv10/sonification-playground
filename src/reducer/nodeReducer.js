import { createAction, createReducer } from "@reduxjs/toolkit";

export const addNode = createAction("node/add");
export const removeNode = createAction("node/remove");
export const updateNode = createAction("node/update");
export const updateNodeData = createAction("node/update/data");

const initialState = [];

export const nodeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addNode, (state, action) => {
      console.log(action.payload);
      if (!state.find((v, i, a) => v.id === action.payload.id)) {
        state.push(action.payload);
      }
    })
    .addCase(removeNode, (state, action) => {
      return state.filter((v, i, a) => v.id !== action.payload);
    })
    .addCase(updateNode, (state, action) => {
      var node = state.find((v, i, a) => v.id === action.payload.id);
      if (node) {
        node = { ...node, ...action.payload.data };
      }
    })
    .addCase(updateNodeData, (state, action) => {
      var node = state.find((v, i, a) => v.id === action.payload.id);
      if (node) {
        node.data = { ...node.data, ...action.payload.data };
      }
    });
});

export default nodeReducer;
