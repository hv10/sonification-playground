import React, { memo } from "react";
import ReactDOM from "react-dom";
import { Handle } from "react-flow-renderer";
import { Toggle, Dropdown, Tile } from "carbon-components-react";
import { useNodeStyles } from "../../constants/nodeStyle";
import colors from "../../constants/colors";
import "../../constants/flowRules.css";
import LabeledHandle, { NameTypeLabel } from "../LabeledHandle";
import ToneJSContext from "../../ToneJSContext";
import * as Tone from "tone";
import { FlashFilled16 } from "@carbon/icons-react";
import { connect } from "react-redux";
import { Knob, Arc, Pointer, Value } from "rc-knob";
import { addDataview } from "../../reducer/dataViewReducer";
import { updateNodeData } from "../../reducer/nodeReducer";
import ViewerContext from "../../ViewerContext";

export const DrawKnobView = ({ name, value, onChange = () => {} }) => {
  return (
    <Tile>
      <span style={{ pointerEvents: "none" }}>{name}</span>
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <Knob
          size={100}
          angleOffset={220}
          angleRange={280}
          min={0}
          max={100}
          value={value * 100}
          onChange={(value) => onChange(value / 100)}
        >
          <Arc arcWidth={5} color="#FC5A96" radius={47.5} />
          <Pointer
            width={5}
            radius={40}
            type="circle"
            color={colors.secondary}
          />
          <Value marginBottom={40} decimalPlaces={-2} className="value" />
        </Knob>
      </div>
    </Tile>
  );
};

const KnobNode = ({ data, addDataview, updateValue }) => {
  const toneJSContext = React.useContext(ToneJSContext);
  const viewerContext = React.useContext(ViewerContext);
  const classes = useNodeStyles({ color: colors.nodeDefault });
  React.useEffect(() => {
    if (!toneJSContext[data.id]) {
      toneJSContext[data.id] = {
        signal: new Tone.Signal(),
      };
    }
    if (!viewerContext[data.id]) {
      viewerContext[data.id] = {
        id: data.id,
        gridData: { x: 0, y: 0, w: 1, h: 1, isResizable: false },
        renderComponent: (
          <DrawKnobView
            name={data.id}
            value={data.value}
            onChange={(val) => updateValue(data.id, val)}
          />
        ),
      };
    }
  });
  React.useEffect(() => {
    console.log("Value Changed to:", data.value);
    toneJSContext[data.id].signal.value = data.value;
  }, [data.value]);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      <div className={classes.content}>
        <div className="nodrag"></div>
      </div>

      <LabeledHandle
        type="source"
        position="right"
        id="signal"
        label={NameTypeLabel("Value", "audio")}
        className={classes.handle}
        style={{ background: colors.audio }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addDataview: (data) => dispatch(addDataview(data)),
    updateValue: (id, val) =>
      dispatch(updateNodeData({ id: id, data: { value: val } })),
  };
};

export default connect(null, mapDispatchToProps)(KnobNode);
