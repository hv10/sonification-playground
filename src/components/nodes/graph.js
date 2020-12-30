import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import {
  Button,
  NumberInput,
  Dropdown,
  PropTypes,
} from "carbon-components-react";
import { Flash32 } from "@carbon/icons-react";
import { useNodeStyles } from "../../constants/nodeStyle";
import colors from "../../constants/colors";
import "../../constants/flowRules.css";
import LabeledHandle, { NameTypeLabel } from "../LabeledHandle";
import { addDataview, removeDataview } from "../../reducer/dataViewReducer";
import { connect } from "react-redux";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";

const RenderLineGraph = ({ data = [{ x: 0, y: 0 }], name = "" }) => {
  return (
    <LineChart
      data={data}
      options={{
        title: `VISUAL ${name}`,
        axes: {
          bottom: {
            title: "TimeStep",
            mapsTo: "x",
            scaleType: "linear",
          },
          left: {
            mapsTo: "y",
            title: "Value",
            scaleType: "linear",
          },
        },
        curve: "curveMonotoneX",
        height: "100%",
        width: "100%",
      }}
    ></LineChart>
  );
};

const GraphOutNode = ({ data, addDataview, removeDataview }) => {
  const classes = useNodeStyles({ color: colors.output });
  React.useEffect(() => {
    addDataview({
      id: data.id,
      gridData: { x: 0, y: 0, w: 3, h: 2, maxW: 6, maxH: 4 },
      renderComponent: <RenderLineGraph name={data.id} />,
    });
    console.log(data.id);
  }, []);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      <div className={classes.content}>
        <Dropdown
          id="inline"
          titleText="Graph Type:"
          label="No Selection"
          type="inline"
          items={["Line", "FFT"]}
        />
      </div>
      <LabeledHandle
        type="target"
        position="left"
        id="dataIn"
        label={NameTypeLabel("In Value", "value,audio")}
        className={classes.handle}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDataview: (v) => dispatch(addDataview(v)),
    removeDataview: (id) => dispatch(removeDataview(id)),
  };
};

export default connect(null, mapDispatchToProps)(GraphOutNode);
