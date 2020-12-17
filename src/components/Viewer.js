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
      <div key="a" data-grid={{ x: 0, y: 0, w: 3, h: 1, minW: 3, minH: 1 }}>
        a
      </div>
      <div key="b" data-grid={{ x: 1, y: 0, w: 1, h: 1 }}>
        b
      </div>
      <div key="c" data-grid={{ x: 2, y: 0, w: 1, h: 1 }}>
        c
      </div>
    </ResponsiveGridLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    dataviews: state.dataviews,
  };
};

export default connect(mapStateToProps)(Viewer);
