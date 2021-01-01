import React from "react";

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

import nodeReducer from "./reducer/nodeReducer";
import edgeReducer from "./reducer/edgeReducer";
import { dataviewReducer } from "./reducer/dataViewReducer";
import { Loading } from "carbon-components-react";
import downloadJSON from "./constants/downloadJSON";

import "./App.css";
import "carbon-components/css/carbon-components.min.css";
import {
  ButtonSet,
  Button,
  Dropdown,
  Tab,
  Tabs,
  Grid,
  Column,
  Row,
  ComposedModal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "carbon-components-react";
import Editor from "./components/Editor";
import { createUseStyles } from "react-jss";
import Measure from "react-measure";
import classNames from "classnames";
import { settings } from "carbon-components";
import Viewer from "./components/Viewer";
import AddNodeModal from "./components/AddNodeModal";
import TransportControls from "./components/TransportControls";
import * as Tone from "tone";

const persistConfig = {
  key: "root",
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

const { prefix } = settings;

const useStyles = createUseStyles({
  fill: {
    width: "100%",
    height: "90%", // magic number change me later to 95% to only support 720p+
  },
});

const TabContentShowOnlyWhenSelected = ({
  selected,
  children,
  className,
  ...other
}) => (
  <div
    {...other}
    selected={selected}
    role="tabpanel"
    className={classNames(
      className,
      "fillVertical",
      selected ? "visible" : "hidden",
      `${prefix}--tab-content`
    )}
  >
    {children}
  </div>
);
const TabContentRenderedOnlyWhenSelected = ({
  selected,
  children,
  className,
  ...other
}) =>
  !selected ? (
    <div {...other} />
  ) : (
    <div
      {...other}
      selected={selected}
      role="tabpanel"
      className={classNames(
        className,
        "fillVertical",
        `${prefix}--tab-content`
      )}
    >
      {children}
    </div>
  );

function App({ downloadStore = () => {}, updateProjectSelection = () => {} }) {
  const classes = useStyles();
  const [suspended, setSuspended] = React.useState(
    Tone.context.state === "suspended"
  );
  const [editorDim, setEditorDim] = React.useState({
    width: -1,
    height: -1,
  });
  const startAudio = async () => {
    await Tone.start();
    await Tone.context.addAudioWorkletModule(
      process.env.PUBLIC_URL + "/peakDetectorWorklet.js",
      "peakDetector"
    );
    console.log("Started");
    setSuspended(false);
  };
  const checkState = () => {
    if (!suspended && Tone.context.state !== "running") {
      setSuspended(true);
    }
  };
  React.useEffect(() => {
    const intv = setInterval(checkState, 5000);
    return () => {
      clearInterval(intv);
    };
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading active />} persistor={persistor}>
        {!suspended ? (
          <>
            <Tabs type="container">
              <Tab
                id="tab-editor"
                label="Editor"
                renderContent={TabContentShowOnlyWhenSelected}
              >
                <Grid className={classes.actions}>
                  <Row>
                    <Column>
                      <AddNodeModal />
                    </Column>
                    <Column>
                      <Dropdown
                        id="inline"
                        titleText="Select Project"
                        label="No Project Selected"
                        type="inline"
                        items={["Project 1", "Project 2", "Project 3"]}
                        onChange={(e) => updateProjectSelection(e.selectedItem)}
                      />
                    </Column>
                    <Column>
                      <ButtonSet>
                        <Button
                          kind="secondary"
                          onClick={() =>
                            downloadJSON(store.getState(), "export")
                          }
                        >
                          Download Project
                        </Button>
                        <Button kind="danger--tertiary">Delete Project</Button>
                      </ButtonSet>
                    </Column>
                  </Row>
                </Grid>
                <Measure
                  bounds
                  onResize={(contentRect) => {
                    setEditorDim(contentRect.bounds);
                  }}
                >
                  {({ measureRef }) => (
                    <div className={classes.fill} ref={measureRef}>
                      <Editor
                        width={editorDim.width}
                        height={editorDim.height}
                      />
                    </div>
                  )}
                </Measure>
              </Tab>
              <Tab id="tab-viewer" label="Viewer">
                <div className={classes.fill}>
                  <Viewer />
                </div>
              </Tab>
            </Tabs>
            <TransportControls />
          </>
        ) : (
          <ComposedModal open={true} size="small" onClose={() => false}>
            <ModalHeader label="Sorry" title="Audio Context not Initialized" />
            <ModalBody>
              As the Audio cannot be automatically started you have to click a
              button once to start it (at least till you reload).
            </ModalBody>
            <ModalFooter>
              <Button onClick={startAudio}>Start Audio</Button>
            </ModalFooter>
          </ComposedModal>
        )}
      </PersistGate>
    </Provider>
  );
}

export default App;
