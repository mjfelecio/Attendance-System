import { Button, Flex, HStack, Input, Text } from "@chakra-ui/react";
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
import { useState, useEffect } from "react";
import { getDateOnly } from "../../utils/dateUtils";

const EventModal = ({ isOpen, onClose, onSave, eventData }) => {
  // Form data states initialized as empty strings
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Effect to populate the form data if eventData is provided
  useEffect(() => {
    if (eventData && Object.keys(eventData).length > 0) {
      setName(eventData.name || "");
      setDescription(eventData.description || "");
      setStartDate(eventData.date ? getDateOnly(eventData.date) : ""); // Format date to "YYYY-MM-DD"
      // TODO: Implement real endDate later, for now events are only 1 day
      setEndDate(eventData.date ? getDateOnly(eventData.date) : ""); // Format date to "YYYY-MM-DD"
      setStartTime(eventData.startTime ? eventData.startTime : "");
      setEndTime(eventData.endTime ? eventData.endTime : "");
    }
  }, [eventData]);

  const handleSave = () => {
    onSave({
      name,
      description,
      date: startDate,
      startTime: startTime,
      endTime: endTime,
    });

    clearInputs();
    onClose();
  };

  const clearInputs = () => {
    setName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size={"md"}>
      <DialogContent bg={"white"}>
        <DialogHeader>
          <DialogTitle color={"black"} fontSize={"2xl"}>
            {eventData && Object.keys(eventData).length > 0 ? "Edit Event" : "Create New Event"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody color={"black"}>
          <Field label="Name" required paddingBottom="10px">
            <Input
              placeholder="Enter event name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field label="Description" paddingBottom="10px">
            <Input
              placeholder="Enter event description"
              size={"2xl"}
              fontSize={"sm"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
          <HStack paddingBottom="10px">
            <Field label="Start Date" required>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Field>
            <Field label="End Date">
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Field>
          </HStack>
          <HStack>
            <Flex gap={"1"}>
              <Field label="Start" required>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </Field>
              <Field label="End" required>
                <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
              </Field>
            </Flex>
          </HStack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              colorPalette={"red"}
              onClick={() => {
                clearInputs();
                onClose();
              }}
            >
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button colorPalette={"blue"} onClick={() => handleSave()}>
            Save
          </Button>
        </DialogFooter>
        <DialogCloseTrigger color="black" />
      </DialogContent>
    </DialogRoot>
  );
};

EventModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  eventData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date), // "YYYY-MM-DD"
    startTime: PropTypes.string, // "HH:MM"
    endTime: PropTypes.string, // "HH:MM"
  }),
};

export default EventModal;
