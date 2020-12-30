import React from "react";
import { createUseStyles } from "react-jss";
import {
  Button,
  ButtonSet,
  Slider,
  ExpandableTile,
  TileAboveTheFoldContent,
  TileBelowTheFoldContent,
} from "carbon-components-react";
import {
  Play16,
  Stop16,
  Pause16,
  CaretUp24,
  CaretDown24,
} from "@carbon/icons-react";
import * as Tone from "tone";
import { ToneJSContext } from "../ToneJSContext";

const useStyles = createUseStyles({
  transportControl: {
    position: "relative",
    right: "-50%",
    background: "lightgrey",
    zIndex: 10,
    transition: "0.4s ease-in-out",
  },
  center: {
    position: "absolute",
    right: "50%",
    bottom: 0,
    overflow: "visible",
  },
  expandTile: {
    border: "1px solid black",
  },
});

export const TransportControls = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [playing, setPlaying] = React.useState(false);
  const [transport, setTransport] = React.useState(0);
  const toneJSContext = React.useContext(ToneJSContext);
  const handleClick = () => {
    setOpen(!open);
  };
  const onBeforeClick = (e) => {
    if (
      e.target.className &&
      typeof e.target.className === "string" &&
      e.target.className.endsWith("__above-the-fold")
    ) {
      return true;
    }
    return false;
  };
  React.useEffect(() => {
    const interval = setInterval(
      () => setTransport(Tone.Transport.seconds),
      200
    );
    return () => {
      clearInterval(interval);
    };
  }, []);
  const handlePlayPause = () => {
    if (Tone.Transport.state === "started") {
      Tone.Transport.pause();
      setPlaying(false);
    } else {
      Tone.Transport.start();
      setPlaying(true);
    }
  };
  const handleStop = () => {
    Tone.Transport.stop();
    setPlaying(false);
  };
  return (
    <div className={classes.center}>
      <ExpandableTile
        className={classes.transportControl}
        expanded={open}
        onBeforeClick={onBeforeClick}
        onClick={handleClick}
      >
        <TileAboveTheFoldContent className={classes.expandTile}>
          <h3 style={{ pointerEvents: "none" }}>Transport Controls</h3>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <Button
            kind="secondary"
            renderIcon={playing ? Pause16 : Play16}
            hasIconOnly
            iconDescription="Play/Pause"
            onClick={handlePlayPause}
          />
          <Button
            kind="secondary"
            renderIcon={Stop16}
            hasIconOnly
            iconDescription="Stop"
            onClick={handleStop}
          />
          <h4>Time: {Math.max(transport, 0).toFixed(2)}</h4>
        </TileBelowTheFoldContent>
      </ExpandableTile>
    </div>
  );
};

export default TransportControls;
