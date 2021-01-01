import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { connect } from "react-redux";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { ViewerContext } from "../ViewerContext";
import { withSize } from "react-sizeme";

const withSizeHOC = withSize();

const Viewer = ({ size }) => {
  const viewerContext = React.useContext(ViewerContext);
  return (
    <Responsive
      width={size.width}
      className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={144}
      id="viewer"
    >
      {Object.keys(viewerContext).map((v) => (
        <div key={v} data-grid={viewerContext[v].gridData}>
          {viewerContext[v].renderComponent}
        </div>
      ))}
    </Responsive>
  );
};

export default withSizeHOC(Viewer);
