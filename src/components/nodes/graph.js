import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import { Button, NumberInput, Dropdown } from "carbon-components-react";
import { Flash32 } from "@carbon/icons-react";
import { useNodeStyles } from "../../constants/nodeStyle";
import colors from "../../constants/colors";
import "../../constants/flowRules.css";
import LabeledHandle, { NameTypeLabel } from "../LabeledHandle";

const GraphOutNode = memo(({ data }) => {
  const classes = useNodeStyles({ color: colors.output });
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
});

export default GraphOutNode;
