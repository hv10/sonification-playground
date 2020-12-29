import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import { Toggle, Dropdown } from "carbon-components-react";
import { useNodeStyles } from "../../constants/nodeStyle";
import colors from "../../constants/colors";
import "../../constants/flowRules.css";
import LabeledHandle, { NameTypeLabel } from "../LabeledHandle";
import ToneJSContext from "../../ToneJSContext";
import * as Tone from "tone";

const MathNode = ({ data }) => {
  const toneJSContext = React.useContext(ToneJSContext);
  const classes = useNodeStyles({ color: colors.nodeDefault });
  React.useEffect(() => {}, [data.id]);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      <div className={classes.content}></div>
      <LabeledHandle
        type="target"
        position="left"
        id="audio-in"
        label={NameTypeLabel("Value In", "audio")}
        className={classes.handle}
        style={{ background: colors.audio }}
      />
      <LabeledHandle
        type="source"
        position="right"
        id="value-out"
        label={NameTypeLabel("Result", "audio")}
        className={classes.handle}
        style={{ background: colors.audio }}
      />
    </div>
  );
};

export default MathNode;
