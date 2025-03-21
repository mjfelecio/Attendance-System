import { Button, Flex, HStack, Input } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../components/snippets/dialog";
import PropTypes from "prop-types";
import { Field } from "../../components/snippets/field";
import { forwardRef, useState } from "react";
import { convertToUTC, getDateOnly, getHourAndMinuteOnly } from "../../utils/dateUtils";

const EventModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleSave = () => {
    const formattedDate = getDateOnly(startDate);
    const formattedStartTime = getHourAndMinuteOnly(startTime);
    const formattedEndTime = getHourAndMinuteOnly(endTime);

    onSave({
      name,
      description,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    });
    onClose();

    // Clear inputs
    setName("");
    setDescription("");
    setStartDate("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size={"md"}>
      <DialogContent bg={"white"}>
        <DialogHeader>
          <DialogTitle color={"black"} fontSize={"2xl"}>
            Create New Event
          </DialogTitle>
        </DialogHeader>
        <DialogBody color={"black"}>
          <Field label="Name" required>
            <Input
              placeholder="Enter event name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field label="Description">
            <Input
              placeholder="Enter event description"
              size={"2xl"}
              fontSize={"sm"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
          <HStack>
            <Field label="Start Date" required>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Field>
            <Field label="End Date" required>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Field>
          </HStack>
          <Flex gap={"1"}>
            <Field label="Start" required>
              <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </Field>
            <Field label="End" required>
              <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </Field>
          </Flex>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button colorPalette={"red"} onClick={() => onClose()}>
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button onClick={() => handleSave()} colorPalette={"blue"}>
            Save
          </Button>
        </DialogFooter>
        <DialogCloseTrigger color="black"/>
      </DialogContent>
    </DialogRoot>
  );
};

EventModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
};

export default EventModal;
