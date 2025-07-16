import React from "react";
import { Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CalendarEventButtons = () => {
  const navigate = useNavigate();

  const handleCreateEventClick = () => {
    navigate("/events/new");
  };

  const handleTakeAttendanceClick = () => {
    navigate("/events/attendance");
  };

  return (
    <VStack spacing={4} w="full">
      <Button
        bg="blue.800"
        color="white"
        _hover={{ bg: "blue.900" }}
        w="full"
        onClick={handleCreateEventClick}
      >
        Create Event
      </Button>
      <Button
        bg="blue.800"
        color="white"
        _hover={{ bg: "blue.900" }}
        w="full"
        onClick={handleTakeAttendanceClick}
      >
        Take Attendance
      </Button>
    </VStack>
  );
};

export default CalendarEventButtons;