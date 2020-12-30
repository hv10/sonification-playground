import React, { memo } from "react";
import ReactDOM from "react-dom";
import { Handle } from "react-flow-renderer";
import {
  Toggle,
  Dropdown,
  Tile,
  OverflowMenu,
  OverflowMenuItem,
} from "carbon-components-react";
import { useNodeStyles } from "../../constants/nodeStyle";
import colors from "../../constants/colors";
import "../../constants/flowRules.css";
import LabeledHandle, { NameTypeLabel } from "../LabeledHandle";
import ToneJSContext from "../../ToneJSContext";
import * as Tone from "tone";
import { FlashFilled16 } from "@carbon/icons-react";
import { connect } from "react-redux";
import { Knob as RCKnob, Arc, Pointer, Value } from "rc-knob";
import { addDataview } from "../../reducer/dataViewReducer";
import { updateNodeData } from "../../reducer/nodeReducer";
import ViewerContext from "../../ViewerContext";
import NodeOverflowMenu from "../NodeOverflowMenu";

const DrawKnobView = ({ name, value, onChange = () => {} }) => {
  return (
    <Tile>
      <span style={{ pointerEvents: "none" }}>{name}</span>
      <div
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <RCKnob
          size={120}
          angleOffset={220}
          angleRange={280}
          min={0}
          max={100}
          value={value * 100}
          onChange={(value) => onChange(value / 100)}
        >
          <Arc arcWidth={10} color="#FC5A96" radius={50} />
          <Pointer
            width={10}
            radius={35}
            type="circle"
            color={colors.secondary}
          />
          <Value marginBottom={50} decimalPlaces={-2} className="value" />
        </RCKnob>
      </div>
    </Tile>
  );
};

const KnobNode = ({ data, updateValue }) => {
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
        gridData: { x: 0, y: 0, w: 2, h: 2, isResizable: false },
        renderComponent: (
          <DrawKnobView
            name={data.label}
            value={data.value}
            onChange={(val) => updateValue(data.id, val)}
          />
        ),
      };
    }
  }, []);
  React.useEffect(() => {
    console.log("Value Changed to:", data.value);
    toneJSContext[data.id].signal.value = data.value;
  }, [data.value]);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
        <NodeOverflowMenu dataId={data.id} className="nodrag" />
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
