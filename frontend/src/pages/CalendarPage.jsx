import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Container,
  Flex,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// Custom Dialog components (adjust import path as needed)
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogCloseTrigger,
  DialogBody,
} from "../components/snippets/dialog";
// Custom Edit/Delete buttons component
import EditDeleteButtons from "../components/common/EditDeleteButtons";

const CalendarPage = () => {
  // State for selected event (when a date is clicked)
  const [selectedEvent, setSelectedEvent] = useState(null);

  // FullCalendar reference for updating size
  const calendarRef = useRef(null);
  useEffect(() => {
    if (calendarRef.current) {
      setTimeout(() => {
        calendarRef.current.getApi().updateSize();
      }, 500);
    }
  }, []);

  // When a date is clicked, set a sample event
  const handleDateClick = (arg) => {
    setSelectedEvent({ date: arg.dateStr, title: "BSP, Annual Election" });
  };

  // Create Event dialog form states
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreateEvent = () => {
    console.log("New event created:", {
      eventName,
      description,
      startDate,
      endDate,
    });

    setEventName("");
    setDescription("");
    setStartDate("");
    setEndDate("");
  };

  const handleEdit = () => {
    console.log("Edit event:", selectedEvent);
  };

  const handleDelete = () => {
    console.log("Delete event:", selectedEvent);
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-r, blue.100, blue.300)"
      color="black"
      p={4}
      overflowY="auto"
    >
      <Container
        maxW="container.xl"
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="xl"
        overflow="hidden"
      >
        <Flex direction={{ base: "column", md: "row" }}>
          {/* Calendar Section */}
          <Box
            flex={3}
            bg="white"
            borderRadius="md"
            p={6}
            boxShadow="md"
            overflow="auto"
            maxH="590px"
          >
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              dateClick={handleDateClick}
              height="auto"
              ref={calendarRef}
            />
          </Box>
          {/* Right Pane: Details and Actions */}
          <VStack
            flex={1}
            ml={{ md: 4 }}
            mt={{ base: 4, md: 0 }}
            spacing={4}
            p={4}
            bg="gray.100"
            borderRadius="md"
            boxShadow="md"
          >
            {selectedEvent ? (
              <Text fontSize="xl" fontWeight="bold">
                Details of Selected Date
                <Flex></Flex>
              </Text>
            ) : (
              <Text fontSize="xl" fontWeight="bold">
                Details of Selected Date
              </Text>
            )}

            <Box bg="white" color="black" w="full" p={4} borderRadius="md">
              {selectedEvent ? (
                <>
                  <Text>
                    {selectedEvent.date}: {selectedEvent.title}
                  </Text>
                  <Flex justifyContent="flex-end" mt={2}>
                    <EditDeleteButtons onEdit={handleEdit} onDelete={handleDelete} />
                  </Flex>
                </>
              ) : (
                <Text>Select a date to view details</Text>
              )}
            </Box>

            {/* Create Event Dialog */}
            <DialogRoot size="lg" placement="center" motionPreset="slide-in-bottom">
              <DialogTrigger asChild>
                <Button bg="blue.800" color="white" _hover={{ bg: "blue.900" }} w="full">
                  Create Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Event</DialogTitle>
                  <DialogCloseTrigger />
                </DialogHeader>
                <DialogBody>
                  <VStack spacing={4}>
                    <Box w="full">
                      <Text mb={1}>Event Name</Text>
                      <Input
                        placeholder="Enter event name"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                      />
                    </Box>
                    <Box w="full">
                      <Text mb={1}>Description</Text>
                      <Textarea
                        placeholder="Enter event description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Box>
                    <Box w="full">
                      <Text mb={1}>Start Date</Text>
                      <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Box>
                    <Box w="full">
                      <Text mb={1}>End Date</Text>
                      <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </Box>
                    <Flex w="full" justify="flex-end" mt={4}>
                      <Button colorScheme="blue" mr={3} onClick={handleCreateEvent} bg="blue.800">
                        Create
                      </Button>
                    </Flex>
                  </VStack>
                </DialogBody>
              </DialogContent>
            </DialogRoot>

            {/* Take Attendance Button */}
            <Button
              bg="blue.800"
              color="white"
              _hover={{ bg: "blue.900" }}
              w="full"
              onClick={() => (window.location.href = "/EventTakeAttendance")}
            >
              Take Attendance
            </Button>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default CalendarPage;
