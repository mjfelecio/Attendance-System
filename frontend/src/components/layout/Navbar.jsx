import { Box, Button, Flex, HStack, Input } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { InputGroup } from "../snippets/input-group";
import PropTypes from "prop-types";

const Navbar = ({ toggleSidebar }) => {
  return (
    <Flex
      w={"100%"}
      h="50px"
			bg={"gray.200"}
      px={"12px"}
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack gap={2}>
        <Button variant="plain" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={faBars} size="2xl" color="red" />
        </Button>
        <Box>
          <InputGroup
            flex="1"
            endElement={
              <FontAwesomeIcon icon={faSearch} color={"black"} />
            }
          >
            <Input
              placeholder="Search..."
              colorPalette={"orange"}
              variant={"outline"}
              size={"sm"}
            />
          </InputGroup>
        </Box>
      </HStack>
      <FontAwesomeIcon icon={faUserCircle} size="2xl" color="black" />
    </Flex>
  );
};

Navbar.propTypes = {
	toggleSidebar: PropTypes.func
}

export default Navbar;