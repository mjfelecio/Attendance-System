import { Box, Button, Text } from "@chakra-ui/react";
import { ConfirmationModal } from "../components/common/ConfirmationModal";
import { useState } from "react";

const Dashboard = () => {
  // Test code start (I'm just using this to test something)
  const [isOpen, setIsOpen] = useState(false);

  function handleDelete() {
    setIsOpen(false);
    alert("Student has been deleted");
  }
  // Test code end

  return (
    <Box
      w="100%"
      h="100%"
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Text color={"black"} textAlign={"center"} fontSize={"2xl"}>
        DASHBOARD PLACEHOLDER
      </Text>
      {/* Below components are just a test */}
      <Button onClick={() => setIsOpen(true)}>Delete Student</Button>
      <ConfirmationModal
        title={"Delete student"}
        message={"Are you sure about this? This action is irreversible"}
        onConfirm={handleDelete}
        onCancel={() => setIsOpen(false)}
        open={isOpen}
      />
    </Box>
  );
};

export default Dashboard;
