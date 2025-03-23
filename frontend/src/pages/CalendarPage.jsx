import { useState, useEffect, useRef } from "react";
import { Box, Button, VStack, Text, Container, Flex, HStack } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventModal from "../features/events/EventModal";
import useEventStore from "../stores/event.store.js";
import { getDateOnly } from "../utils/dateUtils";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { CiEdit, CiTrash } from "react-icons/ci";
import { restructureEvent } from "../utils/dataFormatting";

const CalendarPage = ({ isResized }) => {
  const { createEvent, fetchEvents, editEvent, deleteEvent } = useEventStore();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]); // State to store events in the calendar
  const [isEventSelected, setIsEventSelected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calendarRef = useRef(null);

  const handleEventClick = (info) => {
    setIsEventSelected(true);
    setSelectedEvent(info.event);
  };

  const handleAddEvent = async (newEvent) => {
    const { success, data, message } = await createEvent(newEvent);

    if (!success) {
      alert("Failed: " + message);
      return;
    } else {
      alert("Success: " + message);
    }

    calendarRef.current.getApi().addEvent({
      id: data.id,
      title: data.name,
      description: data.description,
      start: data.date,
      eventStart: data.startTime,
      eventEnd: data.endTime,
    });
  };

  const handleEditEvent = async (eventId, editedEvent) => {
    const { success, data, message } = await editEvent(eventId, editedEvent);

    if (!success) {
      alert("Failed: " + message);
      return;
    }

    alert("Success: " + message);

    // Update the event in the calendar
    const event = calendarRef.current.getApi().getEventById(eventId);
    event.setProp("title", data.name);
    event.setExtendedProp("description", data.description);
    event.setStart(data.date);
    event.setExtendedProp("eventStart", data.startTime);
    event.setExtendedProp("eventEnd", data.endTime);

    // Updates the events state with the updated data
    setEvents((prevEvents) =>
      prevEvents.map((e) =>
        e.id === eventId
          ? {
              ...e,
              title: data.name,
              description: data.description,
              start: data.date,
              eventStart: data.startTime,
              eventEnd: data.endTime,
            }
          : e,
      ),
    );

    // Update the event details display
    setSelectedEvent(event);
  };

  const handleDeleteEvent = async (eventId) => {
    if (!confirm("Are you sure you want to delete this event?")) {
      return;
    }

    const { success, message } = await deleteEvent(eventId);

    if (!success) {
      alert("Failed: " + message);
      return;
    }

    alert("Success: " + message);

    const event = calendarRef.current.getApi().getEventById(eventId);
    event.remove(); // Remove the event on the Calendar Storage

    // Remove the event on the state to update the calendar
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== eventId));

    // Reset the event details display
    setIsEventSelected(false);
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
      }, 500);
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
              dateClick={() => setIsEventSelected(false)}
              eventClick={handleEventClick}
              height="auto"
              ref={calendarRef}
              events={events}
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
            {isEventSelected ? (
              <Text fontSize="xl" fontWeight="bold">
                Details of Selected Event
              </Text>
            ) : (
              <Text fontSize="xl" fontWeight="bold">
                Details of Selected Date
              </Text>
            )}

            <Box flex={"1"} bg="white" color="black" w="full" p={4} borderRadius="md">
              {isEventSelected ? (
                <Box>
                  <Text>Name: {selectedEvent.title}</Text>
                  <Text>Description: {selectedEvent.extendedProps.description}</Text>
                  <Text>Date: {getDateOnly(selectedEvent.start)}</Text>
                  <Text>Start: {selectedEvent.extendedProps.eventStart}</Text>
                  <Text>End: {selectedEvent.extendedProps.eventEnd}</Text>
                  <Flex justifyContent={"flex-end"} mt={2}>
                    <HStack>
                      <Button
                        colorPalette="blue"
                        variant="solid"
                        size="xs"
                        onClick={() => {
                          setIsEditing(true);
                          setIsModalOpen(true);
                        }}
                      >
                        Edit <CiEdit />
                      </Button>
                      <Button
                        colorPalette="red"
                        variant="solid"
                        size="xs"
                        onClick={() => handleDeleteEvent(selectedEvent.id)}
                      >
                        Delete <CiTrash />
                      </Button>
                    </HStack>
                  </Flex>
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
            {/* Take Attendance Button */}
            <Button
              bg="blue.800"
              color="white"
              _hover={{ bg: "blue.900" }}
              w="full"
              onClick={() => navigate("/EventTakeAttendance")}
            >
              Take Attendance
            </Button>
          </VStack>
        </Flex>
      </Container>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsEditing(false);
        }}
        onSave={(e) => (isEditing ? handleEditEvent(selectedEvent.id, e) : handleAddEvent(e))}
        eventData={isEditing ? restructureEvent(selectedEvent) : {}} // Optional data from a selected event
      />
    </Box>
  );
};

CalendarPage.propTypes = {
  isResized: PropTypes.bool,
};

export default CalendarPage;
