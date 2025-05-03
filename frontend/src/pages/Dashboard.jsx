import { Box, Button, Text } from "@chakra-ui/react";
import { useConfirmationModal } from "../hooks/useConfirmationModal";

const Dashboard = () => {
  // Test code start (I'm just using this to test something)
  const { showConfirmationModal } = useConfirmationModal();

  async function handleDelete() {
    const confirmed = await showConfirmationModal("Delete?", "This action is irreversable")

    if (confirmed) {
      return alert("Student has been deleted");
    }
    alert("Operation cancelled")
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
      <Button onClick={() => handleDelete()}>Delete Student</Button>
    </Box>
  );
};

export default Dashboard;
