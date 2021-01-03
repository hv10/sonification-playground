import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import {
  Button,
  NumberInput,
  Dropdown,
  PropTypes,
} from "carbon-components-react";
import { Flash32 } from "@carbon/icons-react";
import { useNodeStyles } from "../../utils/nodeStyle";
import colors from "../../utils/colors";
import "../../utils/flowRules.css";
import LabeledHandle, { NameTypeLabel } from "../LabeledHandle";
import { addDataview, removeDataview } from "../../reducer/dataViewReducer";
import { connect } from "react-redux";
import { LineChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";
import ViewerContext from "../../ViewerContext";
import ToneJSContext from "../../ToneJSContext";
import * as Tone from "tone";

const RenderLineGraph = ({ name = "", updateData = () => {} }) => {
  const [data, setData] = React.useState([{ x: 0, y: 0, group: "Signal" }]);
  const collectData = () => {
    var data = updateData();
    if (!data) data = [{ x: 0, y: 0, group: "Signal" }];
    setData(data);
  };
  React.useEffect(() => {
    const intv = setInterval(collectData, 128);
    return () => {
      clearInterval(intv);
    };
  }, []);
  return (
    <LineChart
      data={data}
      options={{
        title: `LineGraph ${name}`,
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
        animations: false,
        tooltip: {
          enabled: false,
        },
        points: { enabled: false },
      }}
    ></LineChart>
  );
};

const GraphOutNode = ({ data }) => {
  const classes = useNodeStyles({ color: colors.output });
  const viewerContext = React.useContext(ViewerContext);
  const toneJSContext = React.useContext(ToneJSContext);
  const updateData = () => {
    if (!toneJSContext[data.id]) {
      return [{ x: 0, y: 0, group: "Signal" }];
    }
    return Array.from(toneJSContext[data.id].dataIn.getValue(), (v, i) => {
      return { x: i, y: v, group: "Signal" };
    });
  };
  React.useEffect(() => {
    if (!viewerContext[data.id]) {
      viewerContext[data.id] = {
        id: data.id,
        gridData: data.gridData || { x: 0, y: 0, w: 2, h: 1, maxW: 6, maxH: 4 },
        renderComponent: (
          <RenderLineGraph name={data.label} updateData={updateData} />
        ),
      };
    }
    if (!toneJSContext[data.id]) {
      toneJSContext[data.id] = {
        dataIn: new Tone.Analyser({
          type: "waveform",
          smoothing: 0.2,
          size: 2048,
        }),
      };
    }
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
