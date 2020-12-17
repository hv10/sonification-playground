import React from "react";
import { ModalStateManager, Button, Modal } from "carbon-components-react";

export const AddNodeModal = () => {
  <ModalStateManager
    renderLauncher={({ setOpen }) => (
      <Button kind="secondary" onClick={() => setOpen(true)}>
        Add
      </Button>
    )}
  >
    {({ open, setOpen }) => (
      <Modal
        {...rest}
        open={open}
        onRequestClose={() => setOpen(false)}
      ></Modal>
    )}
  </ModalStateManager>;
};

export default AddNodeModal;
