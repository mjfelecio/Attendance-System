import React, { useState } from "react";
import { Box, Heading, VStack, Text, Container, Flex, Input, Textarea, Button } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useNavigate } from "react-router-dom";

const EventCalendarPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  const backToCalendar = () => {
    navigate("/CalendarPage");
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-r, blue.100, blue.300)" color="black" p={4} overflowY="auto">
      <Container maxW="container.xl" bg="white" p={6} borderRadius="lg" boxShadow="xl" overflow="hidden">
        <Flex direction={{ base: "column", md: "row" }}>
          <Box flex={3} bg="white" borderRadius="md" p={4} boxShadow="md" overflow="auto" maxH="600px">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              height="auto"
            />
          </Box>
          <VStack flex={1} ml={{ md: 4 }} mt={{ base: 4, md: 0 }} spacing={4} p={4} bg="gray.100" borderRadius="md" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold">Details</Text>
            <Input
              placeholder="Name of the Event"
              name="name"
              bg="white"
              color="black"
            />
            <Textarea
              placeholder="Description"
              name="description"
              bg="white"
              color="black"
            />
            <Input
              placeholder="Start Date (mm/dd/yy)"
              name="startDate"
              bg="white"
              color="black"
            />
            <Input
              placeholder="End Date (mm/dd/yy)"
              name="endDate"
              bg="white"
              color="black"
            />
            <Button w="full" bg="blue.800" color="white" _hover={{ bg: "blue.900" }}>
              Create Event
            </Button>
            <Button w="full" bg="blue.800" color="white" _hover={{ bg: "blue.900" }} onClick={backToCalendar}>
              Discard
            </Button>
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default EventCalendarPage;
