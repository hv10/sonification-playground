import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import { Toggle, Dropdown, NumberInput } from "carbon-components-react";
import { useNodeStyles } from "../../utils/nodeStyle";
import colors from "../../utils/colors";
import "../../utils/flowRules.css";
import LabeledHandle, { NameTypeLabel } from "../LabeledHandle";
import ToneJSContext from "../../ToneJSContext";
import * as Tone from "tone";
import { FlashFilled16 } from "@carbon/icons-react";
import {
  changeMathOperator,
  updateNode,
  updateNodeData,
} from "../../reducer/nodeReducer";
import { connect } from "react-redux";

const operations = {
  add: Tone.Add,
  sub: Tone.Subtract,
  mult: Tone.Multiply,
  abs: Tone.Abs,
  neg: Tone.Negate,
  gt: Tone.GreaterThan,
  gtz: Tone.GreaterThanZero,
};

const multivalMap = {
  add: "addend",
  sub: "subtrahend",
  mult: "factor",
  abs: false,
  neg: false,
  gt: "comparator",
  gtz: false,
};

const MathNode = ({ data, changeOperator }) => {
  const toneJSContext = React.useContext(ToneJSContext);
  const classes = useNodeStyles({ color: colors.nodeDefault });
  const [currentOperator, setCurrentOperator] = React.useState(null);
  const makeConnections = (
    newOperator,
    currentOperator = null,
    multival = true
  ) => {
    var ctx = toneJSContext[data.id];
    // disconnect the current operator
    if (currentOperator) {
      ctx.input.disconnect();
      ctx.input.disconnect();
      ctx.operators[currentOperator].disconnect(ctx.result);
    }

    ctx.input.connect(ctx.operators[newOperator]);
    if (multival) ctx.input2.connect(ctx.operators[newOperator][multival]);
    ctx.operators[newOperator].connect(ctx.result);
  };

  React.useEffect(() => {
    if (!toneJSContext[data.id]) {
      toneJSContext[data.id] = {
        operators: {},
        input: new Tone.Signal(),
        input2: new Tone.Signal(),
        result: new Tone.Signal(),
      };
      Object.keys(operations).map(
        (op) => (toneJSContext[data.id].operators[op] = new operations[op]())
      );
      makeConnections(
        data.operation,
        currentOperator,
        multivalMap[data.operation]
      );
      setCurrentOperator(data.operation);
    }
  }, [data.id]);
  React.useEffect(() => {
    makeConnections(
      data.operation,
      currentOperator,
      multivalMap[data.operation]
    );
    setCurrentOperator(data.operation);
  }, [data.operation]);
  const handleOperationChange = (op) => {
    changeOperator(data.id, op);
  };
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      <div className={classes.content}>
        <Dropdown
          id="operations"
          items={Object.keys(operations)}
          selectedItem={data.operation}
          onChange={(e) => handleOperationChange(e.selectedItem)}
        />
      </div>
      <LabeledHandle
        type="target"
        position="left"
        id="input"
        label={NameTypeLabel("Value In", "audio")}
        className={classes.handle}
        style={{ background: colors.audio, top: "20%" }}
      />
      {multivalMap[data.operation] ? (
        <LabeledHandle
          type="target"
          position="left"
          id="input2"
          label={NameTypeLabel("Value 2 In", "audio")}
          className={classes.handle}
          style={{ background: colors.audio, bottom: "40%" }}
        />
      ) : null}
      <LabeledHandle
        type="source"
        position="right"
        id="result"
        label={NameTypeLabel("Result", "audio")}
        className={classes.handle}
        style={{ background: colors.audio }}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeOperator: (id, newOp) =>
      dispatch(updateNodeData({ id: id, data: { operation: newOp } })),
  };
};

export default connect(null, mapDispatchToProps)(MathNode);
