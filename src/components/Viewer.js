import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { connect } from "react-redux";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { ViewerContext } from "../ViewerContext";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Viewer = () => {
  const viewerContext = React.useContext(ViewerContext);
  React.useEffect(() => {
    console.log("ToneCTX", viewerContext);
  });
  return (
    <ResponsiveGridLayout
      className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={120}
      id="viewer"
    >
      {Object.keys(viewerContext).map((v) => (
        <div key={v} data-grid={viewerContext[v].gridData}>
          {viewerContext[v].renderComponent}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

export default Viewer;
