import React, { memo } from "react";
import * as Tone from "tone";
import { Handle } from "react-flow-renderer";
import { Button, NumberInput, Dropdown } from "carbon-components-react";
import { ColorSwitch16, Flash32 } from "@carbon/icons-react";
import { useNodeStyles } from "../../constants/nodeStyle";
import isValidConnection from "../../constants/isValidConnection";
import colors from "../../constants/colors";
import { LabeledHandle, NameTypeLabel } from "../LabeledHandle";
import "../../constants/flowRules.css";
import ToneJSContext from "../../ToneJSContext";

const SynthNode = ({ data }) => {
  const classes = useNodeStyles({ color: colors.nodeDefault });
  const [synthType, setSynthType] = React.useState("sine");
  const [frequency, setFrequency] = React.useState(440);
  const toneJSContext = React.useContext(ToneJSContext);
  const trigger = () => {
    const now = Tone.now();
    toneJSContext[data.id].synth.triggerAttackRelease(
      toneJSContext[data.id].frequency.value,
      "8n",
      now
    );
  };
  const setClampedFrequency = (v) => {
    setFrequency(Math.max(Math.min(v, 20000), 20));
  };
  const ensureToneJSExistence = () => {
    if (!toneJSContext[data.id]) {
      toneJSContext[data.id] = {
        frequency: new Tone.Signal(frequency),
        synth: new Tone.Synth({
          oscillator: { type: synthType },
        }),
      };
      toneJSContext[data.id].frequency.connect(
        toneJSContext[data.id].synth.frequency
      );
    }
  };
  React.useEffect(() => {
    ensureToneJSExistence();
    toneJSContext[data.id].synth.oscillator.type = synthType;
  }, [synthType]);
  React.useEffect(() => {
    ensureToneJSExistence();
    toneJSContext[data.id]["frequency"].value = frequency;
  }, [frequency]);
  React.useEffect(() => {
    ensureToneJSExistence();
    //toneJSContext[data.id].synth.toDestination();
  }, []);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      <div className={classes.content}>
        <Dropdown
          id="inline"
          titleText="Synth Type:"
          label="Synth Type"
          type="inline"
          value={synthType}
          onChange={(e) => setSynthType(e.selectedItem)}
          items={["sine", "pulse", "square"]}
        />
        <NumberInput
          id="in_freq"
          invalidText="Frequency is not valid! (20-20k)"
          label="Frequency (Hz)"
          step={10}
          value={frequency}
          onChange={(e) => setClampedFrequency(e.imaginaryTarget.value)}
          className="nodrag"
        />
        <Button
          hasIconOnly
          renderIcon={Flash32}
          iconDescription="Trigger (Inp.2)"
          tooltipAlignment="start"
          onClick={trigger}
          className="nodrag"
        />
      </div>
      <LabeledHandle
        type="target"
        position="left"
        className={classes.handle}
        id="value-frequency-in"
        label={NameTypeLabel("frequency", "value")}
        style={{ top: "20%" }}
      />
      <LabeledHandle
        type="target"
        position="left"
        className={classes.handle}
        id="value-trigger-in"
        label={NameTypeLabel("trigger", "value")}
        style={{ bottom: "40%" }}
      />
      <LabeledHandle
        type="source"
        position="right"
        className={classes.handle}
        id="synth"
        label={NameTypeLabel("synth-out", "audio")}
        style={{ background: colors.audio, top: "20%" }}
        isValidConnection={isValidConnection}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </div>
  );
};

export default SynthNode;
