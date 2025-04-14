import {
  Box,
  Table,
  Heading,
  Flex,
  IconButton,
  Button  
} from "@chakra-ui/react";
import { IoPersonAddOutline } from "react-icons/io5";
import { useState } from "react";

import AddStudentModal from "../features/addStudent/AddStudentModal"; 
import SearchBar from "../components/common/SearchBar";
import SortBy from "../components/common/SortBy";

const ManageList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    usn: "213131376712",
    lastName: "Gasacao",
    firstName: "John Ashly",
    middleName: "Otlang",
    strandprogram: "BSIT/Animation",
    section: "1B/Gumamela",
    yearLevel: "2nd Year/11th Grader",
    schoolLevel: "College/SHS",
  }));

  return (
    <Box minH="100vh" bgGradient="linear(to-r, blue.100, blue.300)" p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <Heading color="black">Students List</Heading>
        <Flex gap={3}>
          <SortBy />
          <SearchBar />
        </Flex>
      </Flex>

      <Box
        bg="white"
        borderRadius="md"
        p={4}
        boxShadow="md"
        maxH="600px"
        overflowY="auto"
        position="relative"
      >
        <IconButton 
        aria-label="Add Student"
        variant="ghost"
        key="ghost"
        color="black" 
        onClick={() => {
          setSelectedStudent(null);
          setIsModalOpen(true);
        }}
        
        position="absolute"
        top="10px"
        right="10px"
        _hover={{ bg: "gray.100" }}
        >
          <IoPersonAddOutline />
        </IconButton>
          
          

        <Table.Root size="sm" striped>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>USN</Table.ColumnHeader>
              <Table.ColumnHeader>Last Name</Table.ColumnHeader>
              <Table.ColumnHeader>First Name</Table.ColumnHeader>
              <Table.ColumnHeader>Middle Name</Table.ColumnHeader>
              <Table.ColumnHeader>Strand Program</Table.ColumnHeader>
              <Table.ColumnHeader>Section</Table.ColumnHeader>
              <Table.ColumnHeader>Year Level</Table.ColumnHeader>
              <Table.ColumnHeader>School Level</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {students.map((student) => (
              <Table.Row
                key={student.usn}
                _hover={{ bg: "gray.100", cursor: "pointer" }}
                onClick={() => {
                  setSelectedStudent(student);
                  setIsModalOpen(true);
                }}
              >
                <Table.Cell>{student.usn}</Table.Cell>
                <Table.Cell>{student.lastName}</Table.Cell>
                <Table.Cell>{student.firstName}</Table.Cell>
                <Table.Cell>{student.middleName}</Table.Cell>
                <Table.Cell>{student.strandprogram}</Table.Cell>
                <Table.Cell>{student.section}</Table.Cell>
                <Table.Cell>{student.yearLevel}</Table.Cell>
                <Table.Cell>{student.schoolLevel}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => {
          setSelectedStudent(null);
          setIsModalOpen(false);
        }}
        studentData={selectedStudent}
        onSave={(student) => {
          console.log("Saved student:", student);
          setIsModalOpen(false);
        }}
      />
    </Box>
  );
};

export default ManageList;
