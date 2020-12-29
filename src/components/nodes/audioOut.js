import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import { Toggle, Dropdown } from "carbon-components-react";
import { useNodeStyles } from "../../constants/nodeStyle";
import colors from "../../constants/colors";
import "../../constants/flowRules.css";
import LabeledHandle, { NameTypeLabel } from "../LabeledHandle";
import ToneJSContext from "../../ToneJSContext";
import * as Tone from "tone";

const AudioOutNode = ({ data }) => {
  const toneJSContext = React.useContext(ToneJSContext);
  const classes = useNodeStyles({ color: colors.output });
  const [mute, setMute] = React.useState(false);
  React.useEffect(() => {
    if (!toneJSContext[data.id]) {
      toneJSContext[data.id] = new Tone.Gain();
      toneJSContext[data.id].toDestination();
    }
    toneJSContext[data.id].gain.value = mute ? 0 : 1;
    console.log("ToneCTX", toneJSContext);
  }, [data.id, mute]);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      <div className={classes.content}>
        <Toggle
          toggled={!mute}
          id="toggle-output"
          labelB="Enabled"
          labelA="Muted"
          onChange={() => {
            setMute(!mute);
          }}
        />
      </div>
      <LabeledHandle
        type="target"
        position="left"
        id="audio-in"
        label={NameTypeLabel("Audio In", "audio")}
        className={classes.handle}
        style={{ background: colors.audio }}
      />
    </div>
  );
};

export default AudioOutNode;
