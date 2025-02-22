import React, { useState } from "react";
import { Box, Heading, VStack, Text, Container, Flex } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import CalendarEventButtons from "../components/common/CalendarEventButtons";

const CalendarPage = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateClick = (arg) => {
    setSelectedEvent({ date: arg.dateStr, title: "BSP, Annual Election" });
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-r, blue.100, blue.300)" color="black" p={4} overflowY="auto">
      <Container maxW="container.xl" bg="white" p={6} borderRadius="lg" boxShadow="xl" overflow="hidden">
        <Flex direction={{ base: "column", md: "row" }}>
          <Box flex={3} bg="white" borderRadius="md" p={4} boxShadow="md" overflow="auto" maxH="590px">
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              dateClick={handleDateClick}
              height="auto"
            />
          </Box>
          <VStack flex={1} ml={{ md: 4 }} mt={{ base: 4, md: 0 }} spacing={4} p={4} bg="gray.100" borderRadius="md" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold">Details of Selected Date</Text>
            <Box bg="white" color="black" w="full" p={4} borderRadius="md">
              {selectedEvent ? (
                <Text>{selectedEvent.date}: {selectedEvent.title}</Text>
              ) : (
                <Text>Select a date to view details</Text>
              )}
            </Box>
            <CalendarEventButtons />
          </VStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default CalendarPage;