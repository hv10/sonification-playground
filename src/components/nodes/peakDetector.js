import React, { memo } from "react";
import ReactDOM from "react-dom";
import { Handle } from "react-flow-renderer";
import { Tile, NumberInput } from "carbon-components-react";
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

const PeakDetectorNode = ({ data }) => {
  const toneJSContext = React.useContext(ToneJSContext);
  const classes = useNodeStyles({ color: colors.nodeDefault });
  React.useEffect(() => {
    if (!toneJSContext[data.id]) {
      toneJSContext[data.id] = {
        input: new Tone.Signal(),
        peaks: new Tone.Signal(),
        analyser: Tone.context.createAudioWorkletNode("peakDetector"),
      };
      toneJSContext[data.id].input.connect(toneJSContext[data.id].analyser);
      toneJSContext[data.id].analyser.onprocessorerror = (e) =>
        console.log("Processing Error", e);
      Tone.connect(
        toneJSContext[data.id].analyser,
        toneJSContext[data.id].peaks
      );
    }
    console.log(toneJSContext[data.id].analyser.parameters.get("lag").value);
  }, []);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
        <NodeOverflowMenu dataId={data.id} className="nodrag" />
      </div>
      <div className={classes.content}>
        <div className="nodrag">
          <NumberInput label="Lag" min={5} max={128} />
          <NumberInput label="Threshold (sigma)" min={0} max={20} />
          <NumberInput label="Influence" min={0} max={1} step={0.01} />
        </div>
      </div>

      <LabeledHandle
        type="target"
        position="left"
        id="input"
        label={NameTypeLabel("Input", "audio")}
        className={classes.handle}
        style={{ background: colors.audio }}
      />
      <LabeledHandle
        type="source"
        position="right"
        id="peaks"
        label={NameTypeLabel("Peaks", "audio")}
        className={classes.handle}
        style={{ background: colors.audio }}
      />
    </div>
  );
};

export default PeakDetectorNode;
