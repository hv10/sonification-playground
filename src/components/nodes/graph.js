import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import {
  Button,
  NumberInput,
  Dropdown,
  PropTypes,
} from "carbon-components-react";
import { Flash32 } from "@carbon/icons-react";
import { useNodeStyles } from "../../constants/nodeStyle";
import colors from "../../constants/colors";
import "../../constants/flowRules.css";
import LabeledHandle, { NameTypeLabel } from "../LabeledHandle";
import { addDataview, removeDataview } from "../../reducer/dataViewReducer";
import { connect } from "react-redux";

const GraphOutNode = ({ data, addDataview, removeDataview }) => {
  const classes = useNodeStyles({ color: colors.output });
  React.useEffect(() => {
    addDataview({
      id: data.dataViewId,
      gridData: { x: 0, y: 0, w: 3, h: 1, minW: 3, maxW: 6, maxH: 4 },
      renderComponent: <span>Hello World</span>,
    });
    console.log(data.dataViewId);
  }, []);
  return (
    <div className={classes.background}>
      <div className={classes.header}>
        <h4>{data.label}</h4>
      </div>
      <div className={classes.content}>
        <Dropdown
          id="inline"
          titleText="Graph Type:"
          label="No Selection"
          type="inline"
          items={["Line", "FFT"]}
        />
      </div>
      <LabeledHandle
        type="target"
        position="left"
        id="value-in"
        label={NameTypeLabel("In Value", "value,audio")}
        className={classes.handle}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addDataview: (v) => dispatch(addDataview(v)),
    removeDataview: (id) => dispatch(removeDataview(id)),
  };
};

export default connect(null, mapDispatchToProps)(GraphOutNode);
