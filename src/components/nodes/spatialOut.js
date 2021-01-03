import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import { Toggle, Dropdown, NumberInput } from "carbon-components-react";
import { useNodeStyles } from "../../utils/nodeStyle";
import colors from "../../utils/colors";
import "../../utils/flowRules.css";
import LabeledHandle, { NameTypeLabel } from "../LabeledHandle";
import ToneJSContext from "../../ToneJSContext";
import * as Tone from "tone";
import ViewerContext from "../../ViewerContext";
import { connect } from "react-redux";
import { updateNodeData } from "../../reducer/nodeReducer";

const SpatialOutNode = ({
  data,
  setXPosition,
  setYPosition,
  setPanningModel,
}) => {
  const toneJSContext = React.useContext(ToneJSContext);
  const viewerContext = React.useContext(ViewerContext);
  const classes = useNodeStyles({ color: colors.output });
  const [mute, setMute] = React.useState(false);
  React.useEffect(() => {
    if (!toneJSContext[data.id]) {
      toneJSContext[data.id] = {
        audioIn: new Tone.Gain(),
        panner: new Tone.Panner3D({
          panningModel: "equalpower",
          positionX: data.positionX,
          positionY: 0,
          positionZ: data.positionY,
          rolloffFactor: 5,
          refDistance: 0.5,
          orientationX: -data.positionX,
          orientationZ: -data.positionY,
        }),
        x: new Tone.Signal(),
        y: new Tone.Signal(),
      };
      toneJSContext[data.id].audioIn.connect(toneJSContext[data.id].panner);
      toneJSContext[data.id].x.connect(toneJSContext[data.id].panner.positionX);
      toneJSContext[data.id].y.connect(toneJSContext[data.id].panner.positionZ);
      toneJSContext[data.id].panner.toDestination();
    }
    if (!viewerContext[data.id]) {
      viewerContext[data.id] = {
        id: data.id,
        label: data.label,
        type: "panning",
        positionX: toneJSContext[data.id].panner.positionX.value,
        positionY: toneJSContext[data.id].panner.positionZ.value,
      };
    }
  }, [data.id]);
  React.useEffect(() => {
    toneJSContext[data.id].audioIn.gain.value = mute ? 0 : 1;
  }, [mute]);
  React.useEffect(() => {
    toneJSContext[data.id].x.value = data.positionX;
    toneJSContext[data.id].y.value = data.positionY;
    viewerContext[data.id].positionX = data.positionX;
    viewerContext[data.id].positionY = data.positionY;
  }, [data.positionX, data.positionY]);
  React.useEffect(() => {
    toneJSContext[data.id].panner.panningModel = data.panningModel;
  }, [data.panningModel]);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      <div className={classes.content}>
        <Dropdown
          value={data.panningModel}
          initialSelectedItem={data.panningModel}
          items={["HRTF", "equalpower"]}
          onChange={(e) => setPanningModel(e.selectedItem)}
        />
        <NumberInput
          id="x"
          min={-1}
          max={1}
          value={data.positionX}
          onChange={(e) => setXPosition(e.imaginaryTarget.value)}
          step={0.05}
          label="X Position"
          className="nodrag"
        />
        <NumberInput
          id="y"
          min={-1}
          max={1}
          value={data.positionY}
          onChange={(e) => setYPosition(e.imaginaryTarget.value)}
          step={0.05}
          label="Y Position"
          className="nodrag"
        />
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
        id="x"
        label={NameTypeLabel("x Position", "value")}
        className={classes.handle}
        style={{ top: "20%" }}
      />
      <LabeledHandle
        type="target"
        position="left"
        id="y"
        label={NameTypeLabel("y Position", "value")}
        className={classes.handle}
        style={{ top: "30%" }}
      />
      <LabeledHandle
        type="target"
        position="left"
        id="audioIn"
        label={NameTypeLabel("Audio In", "audio")}
        className={classes.handle}
        style={{ background: colors.audio }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setXPosition: (val) =>
      dispatch(updateNodeData({ id: ownProps.id, data: { positionX: val } })),
    setYPosition: (val) =>
      dispatch(updateNodeData({ id: ownProps.id, data: { positionY: val } })),
    setPanningModel: (val) =>
      dispatch(
        updateNodeData({ id: ownProps.id, data: { panningModel: val } })
      ),
  };
};

export default connect(null, mapDispatchToProps)(SpatialOutNode);
