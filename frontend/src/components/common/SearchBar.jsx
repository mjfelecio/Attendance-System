import { Input, Button, HStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <HStack spacing={2} align="center">
      <Input
        placeholder="Search Name..."
      />
      <Button colorScheme="blue" variant="ghost" color="black">
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </HStack>
  );
};

export default SearchBar;
