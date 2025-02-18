import { Box, Button, Flex, HStack, Input } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { InputGroup } from "../snippets/input-group";

const Navbar = ({ toggleSidebar }) => {
  return (
    <Box w="full" px={4} bgColor="gray.300">
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
    </Box>
  );
};

export default Navbar;
