import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import { Toggle, Dropdown } from "carbon-components-react";
import { useNodeStyles } from "../../constants/nodeStyle";
import colors from "../../constants/colors";
import "../../constants/flowRules.css";

const AudioOutNode = memo(({ data }) => {
  const classes = useNodeStyles({ color: colors.output });
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      <div className={classes.content}>
        <Dropdown
          id="inline"
          titleText="Output:"
          label="No Selected"
          type="inline"
          items={data.outputs ? data.outputs : []}
        />
        <Toggle
          toggled={data.enabled}
          id="toggle-output"
          onChange={(e) => {
            if (data.onMuteToggle) {
              data.onMuteToggle(e.target.checked);
            }
          }}
        />
      </div>
      <Handle
        type="target"
        position="left"
        id="audio-in"
        className={classes.handle}
        style={{ background: colors.audio }}
      />
    </div>
  );
});

export default AudioOutNode;
