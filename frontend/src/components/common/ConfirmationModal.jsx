import { Button } from "../snippets/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../snippets/dialog";
import PropTypes from "prop-types";

export const ConfirmationModal = ({ open, title, message, onConfirm, onCancel }) => {
  return (
    <DialogRoot open={open} size={"sm"} role="alertdialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle fontSize={"2xl"}>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>{message}</DialogBody>
        <DialogFooter>
          <Button colorPalette="red" onClick={onCancel}>
            Cancel
          </Button>
          <Button colorPalette="blue" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={onCancel} />
      </DialogContent>
    </DialogRoot>
  );
};

ConfirmationModal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  message: PropTypes.string,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};
