import React from "react";
import { Tile } from "carbon-components-react";
import { createUseStyles } from "react-jss";
import classNames from "classnames";
import ViewerContext from "../ViewerContext";

const useStyles = createUseStyles({
  pannerHolder: {
    position: "relative",
    padding: 0,
    border: "1px solid grey",
  },
  tooltip: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});
export const PanningView = ({ panners }) => {
  const classes = useStyles();
  const [selectedVal, setSelectedVal] = React.useState(null);
  const [elements, setElements] = React.useState([]);
  const viewerContext = React.useContext(ViewerContext);
  const updateData = () => {
    setElements(
      Object.entries(viewerContext)
        .filter((v) => v[1].type === "panning")
        .map((v) => (
          <circle
            key={v[0]}
            cx={v[1].positionX}
            cy={-v[1].positionY}
            r="0.025"
            fill="red"
            onMouseOver={() => selectEmitter(v)}
            onMouseDown={() => selectEmitter(v)}
          />
        ))
    );
  };
  const selectEmitter = (panner) => {
    setSelectedVal(panner[1].label);
  };
  React.useEffect(() => {
    var intv = setInterval(updateData, 100);
    return () => {
      clearInterval(intv);
    };
  }, []);
  return (
    <Tile className={classNames("viewerTile", classes.pannerHolder)} light>
      <div className={classes.tooltip}>{selectedVal}</div>
      <svg
        preserveAspectRatio="xMidYMin meet"
        viewBox="-1.1 -1.1 2.2 2.2"
        style={{ width: "100%", height: "100%" }}
      >
        <circle cx="0" cy="0.005" r="0.025" />
        <line
          x1="0"
          y1="0.005"
          x2="0"
          y2="-0.055"
          stroke="black"
          strokeWidth="0.025"
        />
        {[...Array(2)].map((v, i) => (
          <>
            <circle
              cx="0"
              cy="0"
              r={0.5 * (i + 1)}
              fillOpacity={0}
              strokeOpacity={0.5}
              strokeWidth={0.005}
              stroke="blue"
              strokeDasharray="0.05, 0.05"
            />
            <text
              x={0.5 * (i + 1)}
              y={0.1 * i}
              fontSize={0.05}
              textLength={0.15}
              lengthAdjust="spacing"
            >
              {(0.5 * (i + 1)).toPrecision(2)}
            </text>
          </>
        ))}
        {elements.map((v) => v)}
      </svg>
    </Tile>
  );
};

export default PanningView;
