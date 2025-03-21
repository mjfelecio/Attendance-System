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
import { useState, useEffect } from "react";
import { getDateOnly, getHourAndMinuteOnly } from "../../utils/dateUtils";

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
      setEndDate(eventData.date ? getDateOnly(eventData.date) : ""); // Format date to "YYYY-MM-DD"
      setStartTime(eventData.startTime ? getHourAndMinuteOnly(eventData.startTime) : ""); // Format time to "HH:MM"
      setEndTime(eventData.endTime ? getHourAndMinuteOnly(eventData.endTime) : ""); // Format time to "HH:MM"
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

    // Clear inputs
    setName("");
    setDescription("");
    setStartDate("");
    setStartTime("");
    setEndTime("");

    onClose();
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
            <Button colorPalette={"red"} onClick={() => onClose()}>
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
    date: PropTypes.string, // "YYYY-MM-DD"
    startTime: PropTypes.string, // "HH:MM"
    endTime: PropTypes.string, // "HH:MM"
  }),
};

export default EventModal;
