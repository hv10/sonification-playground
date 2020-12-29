import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { connect } from "react-redux";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const Viewer = ({ dataviews }) => {
  return (
    <ResponsiveGridLayout
      className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={120}
    >
      {dataviews.map((v) => (
        <div key={v.id} data-grid={v.gridData}>
          {v.renderComponent}
        </div>
      ))}
    </ResponsiveGridLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    dataviews: state.dataviews,
  };
};

export default connect(mapStateToProps)(Viewer);
