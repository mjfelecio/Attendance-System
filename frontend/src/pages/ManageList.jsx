import { Box, Heading, Table, Flex, IconButton, Dialog, Field, Input, Portal, Stack, Button} from '@chakra-ui/react';
import { IoPersonAddOutline } from 'react-icons/io5';
import SearchBar from "../components/common/SearchBar";
import SortBy from "../components/common/SortBy";
import { useState } from 'react';
import { CloseButton } from '@chakra-ui/react';
const ManageList = () => {
  const items = Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    lastName: "Gasacao",
    firstName: "John Ashly",
    middleName: "Otlang",
    USN: "213131376712",
    CoursesProgram: "(courses/strand)"
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Box minH="100vh" bgGradient="linear(to-r, blue.100, blue.300)" color="black" p={4} overflowY="auto">
      <Flex justify="space-between" align="center" mb={4}>
        <Heading color="black">Students List</Heading>

        <Flex align="center" gap={2}>
          <SearchBar />
          <SortBy />
        </Flex>
      </Flex>

      <Box
        flex={3}
        bg="white"
        borderRadius="md"
        p={4}
        boxShadow="md"
        overflowY="scroll"
        maxH="590px"
        height="auto"
        position="relative"
      >
      <Dialog.Root>
      <Dialog.Trigger asChild>
        <IconButton 
          aria-label="Add Student"
          variant="ghost"
          color="black"
          position="absolute"
          top="10px"
          right="10px"
          zIndex={1}
          _hover={{ bg: "gray.100"}}>
        <IoPersonAddOutline />
        </IconButton>
        </Dialog.Trigger>
        <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add Student</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="3">
                <Field.Root>
                  <Field.Label>USN</Field.Label>
                  <Input placeholder="Enter USN" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Last Name</Field.Label>
                  <Input placeholder="Enter Last Name" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>First Name</Field.Label>
                  <Input placeholder="Enter First Name" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Middle Name</Field.Label>
                  <Input placeholder="Enter Middle Name" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Course/Strand</Field.Label>
                  <Input placeholder="Enter Course/Strand" />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorScheme="green">Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>  

        <Table.Root size="sm" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>USN</Table.ColumnHeader>
              <Table.ColumnHeader>Last Name</Table.ColumnHeader>
              <Table.ColumnHeader>First Name</Table.ColumnHeader>
              <Table.ColumnHeader>Middle Name</Table.ColumnHeader>
              <Table.ColumnHeader>Courses/Program</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.USN}</Table.Cell>
                <Table.Cell>{item.lastName}</Table.Cell>
                <Table.Cell>{item.firstName}</Table.Cell>
                <Table.Cell>{item.middleName}</Table.Cell>
                <Table.Cell>{item.CoursesProgram}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  );
};

export default ManageList;
