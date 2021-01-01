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
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { ToneJSContext } from "./ToneJSContext";
import { ViewerContext } from "./ViewerContext";

import nodeReducer from "./reducer/nodeReducer";
import edgeReducer from "./reducer/edgeReducer";
import { dataviewReducer } from "./reducer/dataViewReducer";
import { Loading } from "carbon-components-react";
import downloadJSON from "./constants/downloadJSON";

class ActiveProjects {
  constructor() {
    this._key = "p1";
  }
  get key() {
    return this._key;
  }
  get selected() {
    return this._key;
  }
  set selected(newKey) {
    this._key = newKey;
  }
}

const projects = new ActiveProjects();

const persistConfig = {
  key: projects.key,
  version: 1,
  storage,
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
            <App
              downloadStore={() => downloadJSON(store.getState(), "export")}
              updateProjectSelection={(val) => (projects.selected = val)}
            />
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
