import React from "react";
import { connect } from "react-redux";
import { OverflowMenu, OverflowMenuItem } from "carbon-components-react";
import classNames from "classnames";
import { updateNodeData } from "../reducer/nodeReducer";

const NodeOverflowMenu = ({ dataId, className = "" }) => {
  return (
    <OverflowMenu
      flipped
      className={classNames(className, "nodeMenu")}
      iconDescription="Node Options"
    >
      <OverflowMenuItem itemText="Change Node Name" hasDivider />
      <OverflowMenuItem itemText="Delete Node" isDelete />
    </OverflowMenu>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateNodeLabel: (label) =>
      dispatch(updateNodeData({ id: ownProps.dataId, data: { label: label } })),
  };
};

export default connect(null, null)(NodeOverflowMenu);
