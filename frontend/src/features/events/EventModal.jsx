import { Button, Flex, Input } from "@chakra-ui/react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef, useState } from "react";

const DateInput = forwardRef(({ value, onClick, onChange }, ref) => (
  <Input
    ref={ref}
    value={value}
    onClick={onClick}
    onChange={onChange}
    placeholder="Select a date / time"
  />
));

DateInput.displayName = "DateInput";

const TimePicker = ({ selectedTime, onChange }) => {
  return (
    <DatePicker
      selected={selectedTime}
      onChange={onChange}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
      customInput={<DateInput />}
    />
  );
};

const EventModal = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const handleSave = () => {
    onSave({
      name,
      description,
      eventDate,
      startTime,
      endTime,
    });
    onClose();
    // Clear inputs
    setName("");
    setDescription("");
    setEventDate("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size={"md"}>
      <DialogContent bg={"white"}>
        <DialogHeader>
          <DialogTitle color={"black"} fontSize={"2xl"}>
            New Event
          </DialogTitle>
        </DialogHeader>
        <DialogBody color={"black"}>
          <Field label="Name" required>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
          <Field label="Description">
            <Input
              size={"2xl"}
              fontSize={"sm"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
          <Field label="Date" required>
            <DatePicker
              selected={eventDate}
              onChange={(date) => setEventDate(date)}
              customInput={<DateInput />}
              dateFormat="MMMM d, yyyy"
            />{" "}
          </Field>
          <Flex gap={"1"}>
            <Field label="Start" required>
              <TimePicker selectedTime={startTime} onChange={setStartTime} />{" "}
            </Field>
            <Field label="End" required>
              <TimePicker selectedTime={endTime} onChange={setEndTime} />{" "}
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
        <DialogCloseTrigger color={"black"} />
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
