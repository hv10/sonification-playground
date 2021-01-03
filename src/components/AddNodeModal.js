import React from "react";
import ReactDOM from "react-dom";
import {
  StructuredListCell,
  StructuredListBody,
  StructuredListHead,
  StructuredListWrapper,
  StructuredListRow,
  StructuredListInput,
  Button,
  Modal,
} from "carbon-components-react";
import { CheckmarkFilled16, Add24 } from "@carbon/icons-react";
import { nodeTypes, nodeDescriptions, nodeInOut } from "../utils/nodeTypes";
import { useDispatch } from "react-redux";
import { addNode } from "../reducer/nodeReducer";
import nodeMaker from "../utils/nodeMaker";

export const AddNodeModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState(Object.keys(nodeTypes)[0]);
  const handleAdd = (e) => {
    dispatch(addNode(nodeMaker({ type: selected })));
    setOpen(false);
  };
  return (
    <>
      <Button kind="primary" onClick={() => setOpen(true)} renderIcon={Add24}>
        Add
      </Button>
      {ReactDOM.createPortal(
        <Modal
          open={open}
          setOpen={setOpen}
          onRequestClose={() => setOpen(false)}
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          shouldSubmitOnEnter
          size="lg"
          hasForm
          onRequestSubmit={handleAdd}
        >
          <StructuredListWrapper selection>
            <StructuredListHead>
              <StructuredListRow head>
                <StructuredListCell head>Type</StructuredListCell>
                <StructuredListCell head>IN-OUT</StructuredListCell>
                <StructuredListCell head>Description</StructuredListCell>
                <StructuredListCell head>{""}</StructuredListCell>
              </StructuredListRow>
            </StructuredListHead>
            <StructuredListBody>
              {Object.keys(nodeTypes).map((v, i) => (
                <StructuredListRow onClick={() => setSelected(v)} key={v}>
                  <StructuredListCell>{v}</StructuredListCell>
                  <StructuredListCell>
                    {nodeInOut[v] || "n.d."}
                  </StructuredListCell>
                  <StructuredListCell>
                    {nodeDescriptions[v] || "No Description."}
                  </StructuredListCell>
                  <StructuredListCell>
                    {selected === v ? (
                      <CheckmarkFilled16 aria-label="select an option">
                        <title>select an option</title>
                      </CheckmarkFilled16>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </StructuredListCell>
                </StructuredListRow>
              ))}
            </StructuredListBody>
          </StructuredListWrapper>
        </Modal>,
        document.body
      )}
    </>
  );
};

export default AddNodeModal;
