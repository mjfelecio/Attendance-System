import { Box, Heading, Table, Flex, Pagination, Center, ButtonGroup, IconButton } from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"
import ActionsButtons from "../components/common/ActionsButtons";
import SearchBar from "../components/common/SearchBar";
import SortBy from "../components/common/SortBy";

const EventTakeAttendance = () => {
  /*sample data */
  const items = [
    {
      id: 1,
      lastName: "Gasacao",
      firstName: "John Ashly",
      middleName: "Otlang",
      USN: "213131376712",
      Actions: <ActionsButtons />,
    },
    {
      id: 2,
      lastName: "Gasacao",
      firstName: "John Ashly",
      middleName: "Otlang",
      USN: "213131376712",
      Actions: <ActionsButtons />,
    },
    {
      id: 3,
      lastName: "Gasacao",
      firstName: "John Ashly",
      middleName: "Otlang",
      USN: "213131376712",
      Actions: <ActionsButtons />,
    },
    {
      id: 4,
      lastName: "Gasacao",
      firstName: "John Ashly",
      middleName: "Otlang",
      USN: "213131376712",
      Actions: <ActionsButtons />,
    },
    {
      id: 5,
      lastName: "Gasacao",
      firstName: "John Ashly",
      middleName: "Otlang",
      USN: "213131376712",
      Actions: <ActionsButtons />,
    },
    {
      id: 6,
      lastName: "Gasacao",
      firstName: "John Ashly",
      middleName: "Otlang",
      USN: "213131376712",
      Actions: <ActionsButtons />,
    },
    {
      id: 7,
      lastName: "Gasacao",
      firstName: "John Ashly",
      middleName: "Otlang",
      USN: "213131376712",
      Actions: <ActionsButtons />,
    },
    {
      id: 8,
      lastName: "Gasacao",
      firstName: "John Ashly",
      middleName: "Otlang",
      USN: "213131376712",
      Actions: <ActionsButtons />,
    },
    {
      id: 9,
      lastName: "Gasacao",
      firstName: "John Ashly",
      middleName: "Otlang",
      USN: "213131376712",
      Actions: <ActionsButtons />,
    },
    {
      id: 10,
      lastName: "Gasacao",
      firstName: "John Ashly",
      middleName: "Otlang",
      USN: "213131376712",
      Actions: <ActionsButtons />,
    }
  ];

  return (
    <Box
      minH="100vh"
      colorPalette={"blue"}
      bgGradient="linear(to-r, blue.100, blue.300)"
      color="black"
      p={4}
      overflowY="auto"
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Heading color="black">Take Attendance</Heading>

        <Flex gap={4} align="center">
          <SearchBar />
          <SortBy />
        </Flex>
      </Flex>
      <Box
        flex={3}
        borderRadius="md"
        p={4}
        boxShadow="md"
        overflowY="scroll"
        maxH="590px"
        height="auto"
      >
        <Table.Root size="sm" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Last Name</Table.ColumnHeader>
              <Table.ColumnHeader>First Name</Table.ColumnHeader>
              <Table.ColumnHeader>Middle Name</Table.ColumnHeader>
              <Table.ColumnHeader>USN</Table.ColumnHeader>
              <Table.ColumnHeader>Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {items.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.lastName}</Table.Cell>
                <Table.Cell>{item.firstName}</Table.Cell>
                <Table.Cell>{item.middleName}</Table.Cell>
                <Table.Cell>{item.USN}</Table.Cell>
                <Table.Cell>{item.Actions}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
      <Center>
      <Pagination.Root count={20} pageSize={2} defaultPage={1}>
      <ButtonGroup variant="outline" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <LuChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "outline", _selected: "solid" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <LuChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
      </Pagination.Root>
      </Center>
    </Box>
  );
};

export default EventTakeAttendance;
