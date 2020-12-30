import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import { Toggle, Dropdown } from "carbon-components-react";
import { useNodeStyles } from "../../constants/nodeStyle";
import colors from "../../constants/colors";
import "../../constants/flowRules.css";
import LabeledHandle, { NameTypeLabel } from "../LabeledHandle";
import ToneJSContext from "../../ToneJSContext";
import * as Tone from "tone";
import { FlashFilled16 } from "@carbon/icons-react";
import { connect } from "react-redux";
import { NumberInput } from "carbon-components-react";
import { updateNodeData } from "../../reducer/nodeReducer";

const ValueNode = ({ data, updateValue }) => {
  const toneJSContext = React.useContext(ToneJSContext);
  const classes = useNodeStyles({ color: colors.nodeDefault });
  React.useEffect(() => {
    if (!toneJSContext[data.id]) {
      toneJSContext[data.id] = {
        signal: new Tone.Signal(),
      };
    }
  }, [data.id]);
  React.useEffect(() => {
    toneJSContext[data.id].signal.value = data.value;
  }, [data.value]);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      <div className={classes.content}>
        <NumberInput
          hideLabel
          id="numberInput"
          value={data.value}
          onChange={(e) => updateValue(e.imaginaryTarget.value)}
          className="nodrag"
        />
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
    updateValue: (val) =>
      dispatch(updateNodeData({ id: ownProps.data.id, data: { value: val } })),
  };
};

export default connect(null, mapDispatchToProps)(ValueNode);
