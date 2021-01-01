import React from "react";
import { Handle } from "react-flow-renderer";
import { Tooltip, TooltipDefinition, Tile } from "carbon-components-react";
import colors from "../utils/colors";
import { createUseStyles } from "react-jss";
import isValidConnection from "../utils/isValidConnection";
import { connect } from "react-redux";

const useStyles = createUseStyles({
  tooltip: {
    position: "absolute",
    top: (props) => {
      if (props.style) {
        if (props.style.top) {
          return `calc(${props.style.top} - 10px)`;
        } else if (!props.style.bottom) {
          return "calc(50% - 10px)";
        } else {
          return null;
        }
      } else {
        return "calc(50% - 10px)";
      }
    },
    bottom: (props) =>
      props.style
        ? props.style.bottom
          ? `calc(${props.style.bottom} - 10px)`
          : null
        : null,
    right: (props) => (props.position === "right" ? 0 : null),
    left: (props) => (props.iposition === "left" ? 0 : null),
    margin: 5,
    borderRadius: 5,
    border: "1px solid darkgrey",
    visibility: (props) => (props.visible ? "visible" : "hidden"),
    zIndex: 100,
  },
});

const PureLabeledHandle = (props) => {
  const [visible, setVisible] = React.useState(false);
  const showLabel = () => {
    setVisible(true);
  };
  const hideLabel = () => {
    setVisible(false);
  };
  const connectable = () => {
    if (props.isConnectable) {
      return props.isConnectable();
    } else {
      return true;
    }
  };
  const classes = useStyles({ ...props, visible });
  return (
    <div onMouseLeave={hideLabel} onMouseEnter={showLabel}>
      <Tile className={classes.tooltip}>
        {Array.isArray(props.label)
          ? props.label.map((v) => <div>{v}</div>)
          : props.label}
        <div>{connectable() ? null : "disabled"}</div>
      </Tile>
      <Handle
        {...props}
        isValidConnection={(params) =>
          isValidConnection([...props.nodes], [...props.edges], params)
        }
      ></Handle>
    </div>
  );
};

export const NameTypeLabel = (name, type) => {
  return (
    <>
      <strong>{name}</strong>
      <div>
        <em>type:</em> {type}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    nodes: state.nodes,
    edges: state.edges,
  };
};

export const LabeledHandle = connect(mapStateToProps)(PureLabeledHandle);

export default LabeledHandle;
