import { createAction, createReducer } from "@reduxjs/toolkit";

export const addNode = createAction("node/add");
export const removeNode = createAction("node/remove");
export const updateNode = createAction("node/update");
export const updateNodeData = createAction("node/update/data");
export const replaceState = createAction("node/replaceState");

const initialState = [];

export const nodeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addNode, (state, action) => {
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
        for (var key in action.payload.data) {
          node[key] = action.payload.data[key];
        }
      }
    })
    .addCase(updateNodeData, (state, action) => {
      var node = state.find((v, i, a) => v.id === action.payload.id);
      if (node) {
        node.data = { ...node.data, ...action.payload.data };
      }
    })
    .addCase(replaceState, (state, action) => {
      if (action.payload) {
        return [...action.payload];
      }
    });
});

export default nodeReducer;
