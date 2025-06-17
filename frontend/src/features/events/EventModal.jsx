import { Button, CheckboxGroup, HStack, Input, Text, Textarea, VStack } from "@chakra-ui/react";
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
import { useState, useEffect } from "react";
import { getDateOnly } from "../../utils/dateUtils";
import { validateEventInput } from "../../utils/validation";
import { EventCategorySelectionBox } from "./EventCategorySelectionBox";
import { Checkbox } from "@/components/snippets/checkbox";

const EventModal = ({ isOpen, onClose, onSave, data }) => {
  const [step, setStep] = useState(1);
  const [eventData, setEventData] = useState({
    name: "",
    description: "",
    startDate: getDateOnly(new Date()),
    endDate: getDateOnly(new Date()),
    startTime: "",
    endTime: "",
    // Temporary
    schoolType: [],
    strand: [],
    program: [],
    sections: [],
    yearLevel: [],
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

  // Moves between the two modal steps
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (field, value) => {
    setEventData((prev) => ({ ...prev, [field]: value }));
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
      <DialogContent>
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle color={"black"} fontSize={"2xl"}>
                {data && Object.keys(data).length > 0 ? "Edit Event" : "Create New Event"}
              </DialogTitle>
            </DialogHeader>
            <DialogBody color="black">
              <VStack align="stretch" spacing="4">
                {/* Name */}
                <HStack align="center">
                  <Text minW="100px">Name:</Text>
                  <Input
                    placeholder="Enter event name"
                    value={eventData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </HStack>
                {/* Category selection */}
                <HStack align="center">
                  <Text minW="100px">Category:</Text>
                  <EventCategorySelectionBox />
                </HStack>
                {/* Description */}
                <HStack align="center">
                  <Text minW="100px">Description:</Text>
                  <Textarea
                    textAlign={"start"}
                    placeholder="Enter event description"
                    value={eventData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                  />
                </HStack>
                {/* Date range */}
                <HStack align="center">
                  <Text minW="100px">Date:</Text>
                  <Input
                    type="date"
                    value={eventData.startDate}
                    onChange={(e) => handleChange("startDate", e.target.value)}
                    maxW="150px"
                  />
                  <Text mx="1">—</Text>
                  <Input
                    type="date"
                    value={eventData.endDate}
                    onChange={(e) => handleChange("endDate", e.target.value)}
                    maxW="150px"
                  />
                </HStack>
                {/* Time range */}
                <HStack align="center">
                  <Text minW="100px">Time:</Text>
                  <Input
                    type="time"
                    value={eventData.startTime}
                    onChange={(e) => handleChange("startTime", e.target.value)}
                    maxW="100px"
                  />
                  <Text mx="1">—</Text>
                  <Input
                    type="time"
                    value={eventData.endTime}
                    onChange={(e) => handleChange("endTime", e.target.value)}
                    maxW="100px"
                  />
                </HStack>
              </VStack>
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
              <Button colorPalette={"blue"} onClick={nextStep}>
                Next
              </Button>
            </DialogFooter>
            <DialogCloseTrigger color="black" />
          </>
        )}
        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle color={"black"} fontSize={"2xl"}>
                Select Participants
              </DialogTitle>
            </DialogHeader>
            <DialogBody color="black">
              <VStack align="stretch" spacing="4">
                {/* School Type */}
                <VStack align="start">
                  <Text fontWeight="bold">School Type</Text>
                  <CheckboxGroup
                    value={data.schoolType}
                    onChange={(val) => handleChange("schoolType", val)}
                  >
                    <HStack spacing="4">
                      <Checkbox value="SHS">SHS</Checkbox>
                      <Checkbox value="College">College</Checkbox>
                    </HStack>
                  </CheckboxGroup>
                </VStack>

                <HStack gap={"120px"}>
                  {/* Strand (SHS only) */}
                  <VStack align="start">
                    <Text fontWeight="bold">Strand (SHS)</Text>
                    <CheckboxGroup
                      value={data.strand}
                      onChange={(val) => handleChange("strand", val)}
                    >
                      <VStack align="start">
                        <Checkbox value="STEM">STEM</Checkbox>
                        <Checkbox value="ABM">ABM</Checkbox>
                        <Checkbox value="HUMSS">HUMSS</Checkbox>
                        <Checkbox value="GAS">GAS</Checkbox>
                      </VStack>
                    </CheckboxGroup>
                  </VStack>

                  {/* Program (College only) */}
                  <VStack align="start">
                    <Text fontWeight="bold">Program (College)</Text>
                    <CheckboxGroup
                      value={data.program}
                      onChange={(val) => handleChange("program", val)}
                    >
                      <VStack align="start">
                        <Checkbox value="BSIT">BSIT</Checkbox>
                        <Checkbox value="BSBA">BSBA</Checkbox>
                        <Checkbox value="BSED">BSED</Checkbox>
                        <Checkbox value="BSN">BSN</Checkbox>
                      </VStack>
                    </CheckboxGroup>
                  </VStack>
                </HStack>

                {/* Sections */}
                <VStack align="start">
                  <Text fontWeight="bold">Sections</Text>
                  <CheckboxGroup
                    value={data.sections}
                    onChange={(val) => handleChange("sections", val)}
                  >
                    <VStack align="start">
                      <Checkbox value="Section A">Section A</Checkbox>
                      <Checkbox value="Section B">Section B</Checkbox>
                      <Checkbox value="Section C">Section C</Checkbox>
                    </VStack>
                  </CheckboxGroup>
                </VStack>

                {/* Year Level */}
                <VStack align="start">
                  <Text fontWeight="bold">Year Level</Text>
                  <CheckboxGroup
                    value={data.yearLevel}
                    onChange={(val) => handleChange("yearLevel", val)}
                  >
                    <HStack spacing="4" wrap="wrap">
                      <Checkbox value="11">11</Checkbox>
                      <Checkbox value="12">12</Checkbox>
                      <Checkbox value="1st Year">1st Year</Checkbox>
                      <Checkbox value="2nd Year">2nd Year</Checkbox>
                      <Checkbox value="3rd Year">3rd Year</Checkbox>
                      <Checkbox value="4th Year">4th Year</Checkbox>
                    </HStack>
                  </CheckboxGroup>
                </VStack>
              </VStack>
            </DialogBody>
            <DialogFooter>
              <Button colorPalette={"red"} onClick={prevStep}>
                Back
              </Button>
              <Button colorPalette={"blue"} onClick={handleSave}>
                Save
              </Button>
            </DialogFooter>
            <DialogCloseTrigger color="black" />
          </>
        )}
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
