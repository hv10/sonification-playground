import React from "react";
import logo from "./logo.svg";
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

function App() {
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
  return (
    <>
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
                    />
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
                    <Editor width={editorDim.width} height={editorDim.height} />
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
    </>
  );
}

export default App;
