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
import { getDateOnly } from "../../utils/dateUtils";
import { validateEventInput } from "../../utils/validation";
import { EventCategorySelectionBox } from "./EventCategorySelectionBox";

const EventModal = ({ isOpen, onClose, onSave, data }) => {
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    startDate: getDateOnly(new Date()),
    endDate: getDateOnly(new Date()),
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setEventData({
        name: data.name || "",
        description: data.description || "",
        startDate: data.date ? getDateOnly(data.date) : getDateOnly(new Date()),
        endDate: data.date ? getDateOnly(data.date) : getDateOnly(new Date()),
        startTime: data.startTime || "",
        endTime: data.endTime || "",
      });
    } else {
      setEventData({
        name: "",
        description: "",
        startDate: getDateOnly(new Date()),
        endDate: getDateOnly(new Date()),
        startTime: "",
        endTime: "",
      });
    }
  }, [data]);

  const handleChange = (field, value) => {
    setEventData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    const eventInputs = {
      name: eventData.name,
      description: eventData.description,
      date: eventData.startDate,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
    };

    if (!validateEventInput(eventInputs)) {
      alert("Invalid input: Please check your input again");
      return;
    }

    onSave(eventInputs);
    clearInputs();
    onClose();
  };

  const clearInputs = () => {
    setEventData({
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
    });
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size={"md"}>
      <DialogContent bg={"white"}>
        <DialogHeader>
          <DialogTitle color={"black"} fontSize={"2xl"}>
            {data && Object.keys(data).length > 0 ? "Edit Event" : "Create New Event"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody color={"black"}>
          <Field label="Name" required paddingBottom="10px">
            <Input
              placeholder="Enter event name"
              value={eventData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Field>
          <EventCategorySelectionBox />
          <Field label="Description" paddingBottom="10px">
            <Input
              placeholder="Enter event description"
              size={"2xl"}
              fontSize={"sm"}
              value={eventData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Field>
          <HStack paddingBottom="10px">
            <Field label="Start Date" required>
              <Input
                type="date"
                value={eventData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
              />
            </Field>
            <Field label="End Date">
              <Input
                type="date"
                value={eventData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
              />
            </Field>
          </HStack>
          <HStack>
            <Flex gap={"1"}>
              <Field label="Start" required>
                <Input
                  type="time"
                  value={eventData.startTime}
                  onChange={(e) => handleChange("startTime", e.target.value)}
                />
              </Field>
              <Field label="End" required>
                <Input
                  type="time"
                  value={eventData.endTime}
                  onChange={(e) => handleChange("endTime", e.target.value)}
                />
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
          <Button colorPalette={"blue"} onClick={handleSave}>
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
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
    startTime: PropTypes.string,
    endTime: PropTypes.string,
  }),
};

export default EventModal;
