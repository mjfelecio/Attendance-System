import { VStack, Button, Text, Icon } from "@chakra-ui/react";
import { FaTachometerAlt, FaUserGraduate, FaCalendarCheck, FaChartLine } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideBarButtons = () => {
  const navigate = useNavigate();
  return (
    <VStack spacing={4} align="stretch" bg="blue.900" color="white" h="100vh" p={4} boxShadow="lg">
      <Text fontSize="lg" fontWeight="bold" mb={6}>
        Navigation
      </Text>

      {/*The icons didn't appear, will debug later */}

      <Button
        variant="white"
        leftIcon={<Icon as={FaTachometerAlt} />}
        justifyContent="start"
        colorScheme="whiteAlpha"
        fontWeight="medium"
        _hover={{ bg: "white", color: "black" }}
        onClick={() => navigate("/Dashboard")}
      >
        Dashboard
      </Button>
      <Button
        variant="white"
        leftIcon={<Icon as={FaUserGraduate} />}
        justifyContent="start"
        colorScheme="white"
        fontWeight="medium"
        _hover={{ bg: "red" }}
        onClick={() => navigate("/CalendarPage")}
      >
        Calendar
      </Button>
      <Button
        variant="white"
        leftIcon={<Icon as={FaCalendarCheck} />}
        justifyContent="start"
        colorScheme="whiteAlpha"
        fontWeight="medium"
        _hover={{ bg: "red" }}
        onClick={() => navigate("/ManageList")}
      >
        Manage List
      </Button>
      <Button
        variant="white"
        leftIcon={<Icon as={FaChartLine} />}
        justifyContent="start"
        colorScheme="whiteAlpha"
        fontWeight="medium"
        _hover={{ bg: "red" }}
        onClick={() => navigate("/Settings")}
      >
        Settings
      </Button>
      <Button
        variant="white"
        leftIcon={<Icon as={FaChartLine} />}
        justifyContent="start"
        colorScheme="whiteAlpha"
        fontWeight="medium"
        _hover={{ bg: "red" }}
        onClick={() => navigate("/Dashboard")}
      >
        Log Out
      </Button>
    </VStack>
  );
};

export default SideBarButtons;
