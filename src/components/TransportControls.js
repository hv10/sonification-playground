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

export const TransportControls = ({ playing = false, duration = 120 }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
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
  return (
    <div className={classes.center}>
      <ExpandableTile
        className={classes.transportControl}
        expanded={open}
        onBeforeClick={onBeforeClick}
        onClick={handleClick}
      >
        <TileAboveTheFoldContent className={classes.expandTile}>
          <strong style={{ pointerEvents: "none" }}>Transport Controls</strong>
        </TileAboveTheFoldContent>
        <TileBelowTheFoldContent>
          <Slider min={0} max={duration} />
          <Button
            kind="secondary"
            renderIcon={playing ? Pause16 : Play16}
            hasIconOnly
            iconDescription="Play/Pause"
          />
          <Button
            kind="secondary"
            renderIcon={Stop16}
            hasIconOnly
            iconDescription="Stop"
          />
        </TileBelowTheFoldContent>
      </ExpandableTile>
    </div>
  );
};

export default TransportControls;
