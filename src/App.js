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
} from "carbon-components-react";
import Editor from "./components/Editor";
import { createUseStyles } from "react-jss";
import Measure from "react-measure";
import classNames from "classnames";
import { settings } from "carbon-components";
import Viewer from "./components/Viewer";

const { prefix } = settings;

const useStyles = createUseStyles({
  fill: {
    width: "100%",
    height: "90%", // magic number change me later to 95% to only support 720p+
  },
});

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
  const [editorDim, setEditorDim] = React.useState({
    width: -1,
    height: -1,
  });
  return (
    <Tabs type="container">
      <Tab
        id="tab-editor"
        label="Editor"
        renderContent={TabContentRenderedOnlyWhenSelected}
      >
        <Grid className={classes.actions}>
          <Row>
            <Column>
              <ButtonSet type="inline">
                <Button kind="secondary">Add</Button>
                <Button kind="primary">Make</Button>
              </ButtonSet>
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
  );
}

export default App;
