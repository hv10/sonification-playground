import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "carbon-components/css/carbon-components.min.css";
import { Tab, Tabs } from "carbon-components-react";
import Editor from "./components/Editor";
import { createUseStyles } from "react-jss";
import Measure from "react-measure";
import classNames from "classnames";
import { settings } from "carbon-components";

const { prefix } = settings;

const useStyles = createUseStyles({
  fill: {
    width: "100%",
    height: "100%",
    minHeight: 400,
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
      className={classNames(className, `${prefix}--tab-content`)}
    >
      {children}
    </div>
  );

function App() {
  const classes = useStyles();
  const [editorDim, setEditorDim] = React.useState({
    width: 1280,
    height: 720,
  });
  return (
    <Tabs type="container">
      <Tab id="tab-viewer" label="Viewer">
        <div className={classes.fill}>Empty</div>
      </Tab>
      <Tab
        id="tab-editor"
        label="Editor"
        renderContent={TabContentRenderedOnlyWhenSelected}
      >
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
    </Tabs>
  );
}

export default App;
