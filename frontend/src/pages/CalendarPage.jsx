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
  const { createEvent } = useEventStore();

  const calendarRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  // const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = (date) => {
    const allEvents = calendarRef.current.getApi().getEvents();
    const eventCount = Array.from(allEvents).filter(
      (e) => getDateOnly(e.start) === date.dateStr,
    ).length;

    if (date.dateStr !== null && eventCount !== 0) {
      setSelectedDate(
        `You have ${eventCount} event${eventCount === 1 ? " " : "s"} on ${date.dateStr}, click an event to view its details`,
      );
    } else {
      setSelectedDate(`You have 0 events on ${date.dateStr}, click 'Create Event' to add an event`);
    }
  };

  // Updates the size of the calendar when the Sidebar opens or closes
  useEffect(() => {
    if (calendarRef.current) {
      setTimeout(() => {
        calendarRef.current.getApi().updateSize();
      }, 500); // Small delay to allow layout transition to complete
    }
  }, [isResized]);

  const handleAddEvent = async (newEvent) => {
    const { success, data, message } = await createEvent(newEvent);

    if (success) {
      console.log("Success: " + message);
    } else {
      console.log("Failed: " + message);
      return;
    }

    calendarRef.current.getApi().addEvent({
      id: data.id,
      title: data.name,
      start: data.date,
    });
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
              // eventClick={handleDateClick}
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
              Details of Selected Date
            </Text>
            <Box bg="white" color="black" w="full" p={4} borderRadius="md">
              {selectedDate ? (
                <Text>{selectedDate.toString()}</Text>
              ) : (
                <Text>Select a date to view details</Text>
              )}
              {/* {selectedEvent ? (
                <Text>
                  {selectedEvent.date}: {selectedEvent.title}
                </Text>
              ) : (
                <Text>Select a date to view details</Text>
              )} */}
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
