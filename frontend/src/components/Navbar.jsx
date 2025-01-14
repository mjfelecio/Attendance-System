import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { InputGroup } from "./snippets/input-group";
import Dashboard from "../pages/Dashboard";


const MotionBox = motion(Box);

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Flex flexDirection="column" h="100vh">
      <Container maxW={"full"} px={4} bgColor={"gray.200"}>
        <Flex
          h={"50px"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDir={{
            base: "column",
            sm: "row",
          }}
        >
          <HStack gap={"3"}>
            <Button variant={"plain"} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} size={"2xl"} color={"red"} />
            </Button>
            <Box>
              <InputGroup
                flex="1"
                endElement={
                  <FontAwesomeIcon
                    icon={faSearch}
                    size={"md"}
                    color={"black"}
                  />
                }
              >
                <Input placeholder="Search..." variant={"outline"} size={"sm"} />
              </InputGroup>
            </Box>
          </HStack>

          <FontAwesomeIcon icon={faUserCircle} size="2xl" color="black" />
        </Flex>
      </Container>
      <MotionBox
        w="250px"
        bg="blue.900"
        color="white"
        p={4}
        boxShadow="md"
        h="100vh"
        position="fixed"
        zIndex="overlay"
        left="0"
        top="50px"
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? "0%" : "-100%" }}
        exit={{ x: "-100%" }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 18,
          duration: 0.5,
        }}
      >
        <p>Navigation</p>
      </MotionBox>

      <Dashboard/>
      <Box
        flex="1"
        p={6}
        ml={isSidebarOpen ? "250px" : "0"}
        transition="margin 0.3s ease"
        bg="gray.100"
      >
        <p> </p>
      </Box>
    </Flex>
  );
};

export default Navbar;
