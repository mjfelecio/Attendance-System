import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Input,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { InputGroup } from "./snippets/input-group";

const Navbar = () => {
  return (
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
          <Button variant={"plain"}>
            <FontAwesomeIcon icon={faBars} size={"2xl"} color={"black"} />
          </Button>
          <Box>
            <InputGroup
              flex="1"
              endElement={
                <FontAwesomeIcon icon={faSearch} size={"md"} color={"black"} />
              }
            >
              <Input placeholder="Search..." variant={"outline"} size={"sm"}/>
            </InputGroup>
          </Box>
        </HStack>

        <FontAwesomeIcon icon={faUserCircle} size="2xl" color="black" />
      </Flex>
    </Container>
  );
};

export default Navbar;
