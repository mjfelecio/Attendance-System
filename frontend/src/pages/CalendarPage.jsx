import { useEffect, useRef, useState } from "react";
import { Box, Button, VStack, Text, Container, Flex } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import PropTypes from "prop-types";
import EventModal from "../features/events/EventModal";
import useEventStore from "../stores/event.store.js";
import { getDateOnly } from "../utils/dateUtils";

const CalendarPage = ({ isResized }) => {
  const { createEvent, fetchEvents, editEvent } = useEventStore();
  const [events, setEvents] = useState([]);
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const calendarRef = useRef(null);

  const handleEventClick = (info) => {
    setIsEventSelected(true);
    setSelectedEvent(info.event);
  };

  const handleAddEvent = async (newEvent) => {
    const { success, data, message } = await createEvent(newEvent);

    if (!success) {
      console.log("Failed: " + message);
      return;
    } else {
      console.log("Success: " + message);
    }

    calendarRef.current.getApi().addEvent({
      id: data.id,
      title: data.name,
      start: data.date,
      description: data.description,
      eventStart: data.startTime,
      eventEnd: data.endTime,
    });
  };

  const handleEditEvent = async (eventId, editedEvent) => {
    // const eventId = selectedEvent.id;
    const { success, data, message } = editEvent(eventId, editedEvent);

    if (!success) {
      console.log("Failed: " + message);
      return;
    } else {
      console.log("Success: " + message);
    }

    const event = calendarRef.current.getEventById(eventId);
    event.setProp("title", data.name);
    event.setStart(data.startTime);
    event.setExtendedProps("description", data.description);
    event.setProp("eventStart", data.startTime);
    event.setProp("eventEnd", data.endTime);
  };

  // Loads previously created events to the calendar on page load
  useEffect(() => {
    const fetchEventsFromDB = async () => {
      try {
        const { data } = await fetchEvents();

        if (!data || Array.from(data).length === 0) {
          return;
        }

        // Maps the data to the proper format for FullCalendar Events
        const transformedData = data.map((event) => ({
          id: event.id,
          title: event.name,
          start: event.date,
          description: event.description,
          eventStart: event.startTime,
          eventEnd: event.endTime,
        }));

        setEvents(transformedData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEventsFromDB();
  }, [fetchEvents]);

  // Updates the size of the calendar when the Sidebar opens or closes
  useEffect(() => {
    if (calendarRef.current) {
      setTimeout(() => {
        calendarRef.current.getApi().updateSize();
      }, 500); // Small delay to allow layout transition to complete
    }
  }, [isResized]);

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
              dateClick={() => setIsEventSelected(false)}
              eventClick={handleEventClick}
              height="auto"
              ref={calendarRef}
              events={events}
            />
          </Box>
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
            <Text fontSize="xl" fontWeight="bold">
              Details of Selected Event
            </Text>
            <Box flex={"1"} bg="white" color="black" w="full" p={4} borderRadius="md">
              {isEventSelected ? (
                <Box>
                  <Text>Name: {selectedEvent.title}</Text>
                  <Text>Description: {selectedEvent.extendedProps.description}</Text>
                  <Text>Date: {getDateOnly(selectedEvent.start)}</Text>
                  <Text>Start: {selectedEvent.extendedProps.eventStart}</Text>
                  <Text>End: {selectedEvent.extendedProps.eventEnd}</Text>
                </Box>
              ) : (
                <Text>Select an event to view its details</Text>
              )}
            </Box>
            <Button
              bg="blue.800"
              color="white"
              _hover={{ bg: "blue.900" }}
              w="full"
              onClick={() => setIsModalOpen(true)}
            >
              Create Event
            </Button>
            <Button bg="blue.800" color="white" _hover={{ bg: "blue.900" }} w="full">
              Take Attendance
            </Button>
          </VStack>
        </Flex>
      </Container>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(e) => handleAddEvent(e)}
      />
    </Box>
  );
};

CalendarPage.propTypes = {
  isResized: PropTypes.bool,
};

export default CalendarPage;
