import React from "react";
import { Tile } from "carbon-components-react";
import { useNodeStyles } from "../../utils/nodeStyle";
import colors from "../../utils/colors";
import "../../utils/flowRules.css";
import LabeledHandle, { NameTypeLabel } from "../LabeledHandle";
import "@carbon/charts/styles.css";
import ViewerContext from "../../ViewerContext";
import ToneJSContext from "../../ToneJSContext";
import * as Tone from "tone";

const ValueDisplay = ({ name, updateValue = () => {} }) => {
  const [value, setValue] = React.useState(null);
  const collectValue = () => {
    setValue(updateValue);
  };
  React.useEffect(() => {
    const intv = setInterval(collectValue, 150);
    return () => {
      clearInterval(intv);
    };
  }, []);
  return (
    <Tile className="viewerTile">
      <span>{name}</span>
      <h3>{value}</h3>
    </Tile>
  );
};

const ValueDisplayNode = ({ data }) => {
  const classes = useNodeStyles({ color: colors.output });
  const viewerContext = React.useContext(ViewerContext);
  const toneJSContext = React.useContext(ToneJSContext);
  const [current, setCurrent] = React.useState(null);
  const updateValue = () => {
    if (toneJSContext[data.id]) {
      const val = toneJSContext[data.id].dataIn.getValue().toFixed(5);
      setCurrent(val);
      return val;
    } else {
      setCurrent(null);
      return null;
    }
  };
  React.useEffect(() => {
    if (viewerContext[data.id])
      viewerContext[data.id].renderComponent = (
        <ValueDisplay
          name={data.label}
          value={current}
          updateValue={updateValue}
        />
      );
  }, [current]);
  React.useEffect(() => {
    if (!viewerContext[data.id]) {
      viewerContext[data.id] = {
        id: data.id,
        gridData: { x: 0, y: 0, w: 2, h: 1, isResizable: false },
        renderComponent: (
          <ValueDisplay
            name={data.label}
            value={current}
            updateValue={updateValue}
          />
        ),
      };
    }
    if (!toneJSContext[data.id]) {
      toneJSContext[data.id] = {
        dataIn: new Tone.Meter({
          normalRange: true,
        }),
      };
    }
    const intv = setInterval(updateValue, 100);
    return () => {
      clearInterval(intv);
    };
  }, []);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      <div className={classes.content}>
        <h5>{current}</h5>
      </div>
      <LabeledHandle
        type="target"
        position="left"
        id="dataIn"
        label={NameTypeLabel("In Value", "value, audio")}
        className={classes.handle}
      />
    </div>
  );
};

export default ValueDisplayNode;
