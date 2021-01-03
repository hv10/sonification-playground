import React from "react";
import { Responsive } from "react-grid-layout";
import { connect } from "react-redux";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { ViewerContext } from "../ViewerContext";
import { withSize } from "react-sizeme";
import { updateNodeData } from "../reducer/nodeReducer";
import { Tile } from "carbon-components-react";
import PanningView from "./PanningView";
const withSizeHOC = withSize();

const Viewer = ({ size, updateElementGridData }) => {
  const viewerContext = React.useContext(ViewerContext);
  const handleElementChange = (props) => {
    if (props && Array.isArray(props) && props.length > 0) {
      props.forEach((v) => {
        updateElementGridData(v.i, { ...v });
      });
    }
  };
  if (Object.keys(viewerContext).length > 0) {
    var elements = [
      ...Object.entries(viewerContext)
        .filter((v) => v[1].type !== "panning")
        .map((v) => (
          <div key={v[0]} data-grid={v[1].gridData}>
            {v[1].renderComponent}
          </div>
        )),
    ];

    if (
      Object.entries(viewerContext).filter((v) => v[1].type === "panning")
        .length > 0
    ) {
      elements.push(
        <div
          key="pannerView"
          data-grid={{
            x: 12,
            y: 0,
            w: 3,
            h: 2,
            minW: 3,
            minH: 2,
            maxW: 9,
            maxH: 9,
          }}
        >
          <PanningView />
        </div>
      );
    }
    return (
      <Responsive
        width={size.width}
        className="layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={144}
        id="viewer"
        isBounded
        onLayoutChange={handleElementChange}
      >
        {elements.map((v) => v)}
      </Responsive>
    );
  } else {
    return (
      <Tile>
        <h1>No Viewers available</h1>
      </Tile>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateElementGridData: (v, newData) =>
      dispatch(updateNodeData({ id: v, data: { gridData: newData } })),
  };
};

export default withSizeHOC(connect(null, mapDispatchToProps)(Viewer));
