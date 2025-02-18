import { useEffect, useRef, useState } from "react";
import { Box, Button, VStack, Text, Container, Flex } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import PropTypes from "prop-types";

const CalendarPage = ({ isResized }) => {
  /* sample data */
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateClick = (arg) => {
    setSelectedEvent({ date: arg.dateStr, title: "BSP, Annual Election" });
  };
  /* sample dataSS */

  const calendarRef = useRef(null);

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
              dateClick={handleDateClick}
              height="auto"
              ref={calendarRef}
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
              {selectedEvent ? (
                <Text>
                  {selectedEvent.date}: {selectedEvent.title}
                </Text>
              ) : (
                <Text>Select a date to view details</Text>
              )}
            </Box>
            <Button bg="blue.800" color="white" _hover={{ bg: "blue.900" }} w="full">
              Create Event
            </Button>
            <Button bg="blue.800" color="white" _hover={{ bg: "blue.900" }} w="full">
              Take Attendance
            </Button>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

CalendarPage.propTypes = {
  isResized: PropTypes.bool,
};

export default CalendarPage;
