import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  autoMergeLevel2,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { ToneJSContext } from "./ToneJSContext";
import { ViewerContext } from "./ViewerContext";

import nodeReducer from "./reducer/nodeReducer";
import edgeReducer from "./reducer/edgeReducer";
import { dataviewReducer } from "./reducer/dataViewReducer";
import { Loading } from "carbon-components-react";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

const reducer = combineReducers({
  nodes: nodeReducer,
  edges: edgeReducer,
  dataviews: dataviewReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  //preloadedState: initialState,
});

let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <ToneJSContext.Provider value={{}}>
      <ViewerContext.Provider value={{}}>
        <Provider store={store}>
          <PersistGate loading={<Loading active />} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ViewerContext.Provider>
    </ToneJSContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
