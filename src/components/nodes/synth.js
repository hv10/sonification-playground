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

const SynthNode = memo(({ data }) => {
  const classes = useNodeStyles({ color: colors.nodeDefault });
  const [synthType, setSynthType] = React.useState("sine");
  const [synth, setSynth] = React.useState(null);
  const [frequency, setFrequency] = React.useState(440);
  const trigger = () => {
    const now = Tone.now();
    synth.triggerAttackRelease(frequency, "8n", now);
  };
  React.useEffect(() => {
    const synthObj = new Tone.Synth({
      oscillator: { type: synthType },
    }).toDestination();
    setSynth(() => synthObj);
  }, [synthType]);
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
          invalidText="Frequency is not valid! (50-20k)"
          label="Frequency (Hz)"
          max={20000}
          min={50}
          step={10}
          value={frequency}
          onChange={(e) => setFrequency(e.imaginaryTarget.value)}
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
        id="audio-out"
        label={NameTypeLabel("audio-out", "audio")}
        style={{ background: colors.audio, top: "20%" }}
        isValidConnection={isValidConnection}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </div>
  );
});

export default SynthNode;
