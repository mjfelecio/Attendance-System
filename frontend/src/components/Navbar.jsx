import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CalendarPage from "../pages/CalendarPage";
import ManageList from "../pages/ManageList";
import Settings from "../pages/Settings";
import SButtons from "./SidebarButtons";

const MotionBox = motion(Box);

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Flex flexDirection="column" h="100vh" bg="black">
      <Container maxW="full" px={4} bgColor="gray.200">
        <Flex
          h="50px"
          alignItems="center"
          justifyContent="space-between"
          flexDir={{
            base: "column",
            sm: "row",
          }}
        >
          <HStack gap={3}>
            <Button variant="plain" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} size="2xl" color="red" />
            </Button>
          </HStack>
          <FontAwesomeIcon icon={faUserCircle} size="2xl" color="black" />
        </Flex>
      </Container>
      <Flex flex={1} h="calc(100vh - 50px)" overflow="hidden" position="relative">
        <MotionBox
          w="250px"
          bg="blue.900"
          color="white"
          p={4}
          boxShadow="md"
          h="100%"
          position="absolute"
          zIndex="overlay"
          left="0"
          top="0"
          initial={{ x: "-100%" }}
          animate={{ x: isSidebarOpen ? "0%" : "-100%" }}
          exit={{ x: "-100%" }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 18,
          }}
        >
          <SButtons />
        </MotionBox>
        <Box
          flex={1}
          p={6}
          ml={isSidebarOpen ? "250px" : "0"}
          transition="margin-left 0.5s ease"
          bg="gray.100"
          h="100%"
          w="100%"
          position="relative"
          zIndex="base"
        >
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/CalendarPage" element={<CalendarPage />} />
            <Route path="/ManageList" element={<ManageList />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Navbar;  