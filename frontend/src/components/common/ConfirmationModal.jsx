import { Button } from "../snippets/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../snippets/dialog";

export const ConfirmationModal = ({ open, title, message, onConfirm, onCancel }) => {
  return (
    <DialogRoot open={open} size={"sm"} role="alertdialog">
      <DialogContent>
        <DialogHeader>
          <DialogTitle fontSize={"2xl"}>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>{message}</DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button colorPalette={"red"} onClick={() => onCancel()}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button colorPalette={"blue"} onClick={() => onConfirm()}>
            Confirm
          </Button>
        </DialogFooter>
        <DialogCloseTrigger color="black" />
      </DialogContent>
    </DialogRoot>
  );
};
