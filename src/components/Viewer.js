import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { connect } from "react-redux";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { ViewerContext } from "../ViewerContext";
import { withSize } from "react-sizeme";
import { updateNodeData } from "../reducer/nodeReducer";

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
  return (
    <Responsive
      width={size.width}
      className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={144}
      id="viewer"
      onLayoutChange={handleElementChange}
    >
      {Object.keys(viewerContext).map((v) => (
        <div key={v} data-grid={viewerContext[v].gridData}>
          {viewerContext[v].renderComponent}
        </div>
      ))}
    </Responsive>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateElementGridData: (v, newData) =>
      dispatch(updateNodeData({ id: v, data: { gridData: newData } })),
  };
};

export default withSizeHOC(connect(null, mapDispatchToProps)(Viewer));
