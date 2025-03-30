import {Box, Heading, Table, Flex} from '@chakra-ui/react';
import SearchBar from "../components/common/SearchBar"
import SortBy from "../components/common/SortBy";
import AddStudent from "../components/common/AddStudent";


const ManageList = () => {

    /*sample data */
    const items = [
        { id: 1, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 2, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)"},
        { id: 3, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 4, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 5, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 6, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 7, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 8, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 9, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 10, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 11, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 12, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 13, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 14, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 15, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 16, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },
        { id: 17, lastName: "Gasacao", firstName: "John Ashly", middleName: "Otlang", USN:"213131376712", CoursesProgram: "(courses/strand)" },

      ]

      return (
        <Box minH="100vh" bgGradient="linear(to-r, blue.100, blue.300)" color="black" p={4} overflowY="auto">
          <Flex justify="space-between" align="center" mb={4}>
            <Heading color="black">Students List</Heading>

            <Flex gap={4} align="center">
              <SearchBar />
              <AddStudent />
              <SortBy />
            </Flex>
          </Flex>
          <Box flex={3} bg="white" borderRadius="md" p={4} boxShadow="md" overflowY="scroll" maxH="590px" height="auto">
            <Table.Root size="sm" striped>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>Last Name</Table.ColumnHeader>
                  <Table.ColumnHeader>First Name</Table.ColumnHeader>
                  <Table.ColumnHeader>Middle Name</Table.ColumnHeader>
                  <Table.ColumnHeader>USN</Table.ColumnHeader>
                  <Table.ColumnHeader>Courses/Program</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {items.map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell>{item.lastName}</Table.Cell>
                    <Table.Cell>{item.firstName}</Table.Cell>
                    <Table.Cell>{item.middleName}</Table.Cell>
                    <Table.Cell>{item.USN}</Table.Cell>
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