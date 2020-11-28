import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import { Button, NumberInput, Dropdown } from "carbon-components-react";
import { ColorSwitch16, Flash32 } from "@carbon/icons-react";
import { useNodeStyles } from "../../constants/nodeStyle";
import isValidConnection from "../../constants/isValidConnection";
import colors from "../../constants/colors";
import "../../constants/flowRules.css";

const SynthNode = memo(({ data }) => {
  const classes = useNodeStyles({ color: colors.nodeDefault });
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
          items={["Sine", "Saw", "Pulse"]}
        />
        <NumberInput
          id="in_freq"
          invalidText="Frequency is not valid! (50-20k)"
          label="Frequency (Hz)"
          max={20000}
          min={20}
          step={10}
          value={500}
          className="nodrag"
        />
        <Button
          hasIconOnly
          renderIcon={Flash32}
          iconDescription="Trigger (Inp.2)"
          tooltipAlignment="start"
          className="nodrag"
        />
      </div>
      <Handle
        type="target"
        position="left"
        className={classes.handle}
        id="frequency-in"
        style={{ top: "20%" }}
      />
      <Handle
        type="target"
        position="left"
        className={classes.handle}
        id="trigger-in"
        style={{ bottom: "20%" }}
      />
      <Handle
        type="source"
        position="right"
        className={classes.handle}
        id="audio-out"
        style={{ background: colors.audio }}
        isValidConnection={isValidConnection}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </div>
  );
});

export default SynthNode;
