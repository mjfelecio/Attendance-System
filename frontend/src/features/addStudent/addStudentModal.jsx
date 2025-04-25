"use client";

import {
  Button,
  Flex,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogRoot
} from "../../components/snippets/dialog";
import { Field } from "../../components/snippets/field";
import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";

const AddStudentModal = ({ isOpen, onClose, onSave, studentData }) => {
  const ref = useRef(null);

  const [usn, setUsn] = useState(""); // USN (Primary Key)
  const [lastname, setLastName] = useState(""); // Student Name
  const [firstname, setFirstName] = useState(""); // Student Name
  const [middlename, setMiddleName] = useState(""); // Student Name
  const [strandProgram, setStrandProgram] = useState(""); // Strand Program (Animation, BSIT, etc.)
  const [section, setSection] = useState(""); // Section Name (e.g., Gumamela)
  const [yearLevel, setYearLevel] = useState(""); // Year level (e.g., 2nd year, 11th grader)
  const [schoolLevel, setSchoolLevel] = useState(""); // School level (e.g., SHS, College)

  useEffect(() => {
    if (studentData) {
      setUsn(studentData.usn || "");
      setLastName(studentData.lastname || "");
      setFirstName(studentData.firstname || "");
      setMiddleName(studentData.middlename || "");
      setStrandProgram(studentData.strandProgram || "");
      setSection(studentData.section || "");
      setYearLevel(studentData.yearLevel || "");
      setSchoolLevel(studentData.schoolLevel || "");
    } else {
      clearFields();
    }
  }, [studentData]);

  const handleSave = () => {
    const student = {
      usn,
      lastname,
      firstname,
      middlename,
      strandProgram,
      section,
      yearLevel,
      schoolLevel,
    };

    if (!usn || !lastname || !firstname || !middlename || !strandProgram || !section || !yearLevel || !schoolLevel) {
      alert("Please fill in all required fields.");
      return; 
    }

    onSave?.(student);
    clearFields();
    onClose();
  };

  const clearFields = () => {
    setUsn("");
    setLastName("");
    setFirstName("");
    setMiddleName("");
    setStrandProgram("");
    setSection("");
    setYearLevel("");
    setSchoolLevel("");
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size="md">
      <DialogContent bg="white">
        <DialogHeader>
          <DialogTitle color="black" fontSize="2xl">
            {studentData ? "Edit Student" : "Add New Student"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody color="black">
          <Stack gap="4">
            <Field label="USN (ID)" required>
              <Input
                ref={ref}
                placeholder="Enter USN"
                value={usn}
                onChange={(e) => setUsn(e.target.value)}
              />
            </Field>
            <Field label="Student Last Name" required>
              <Input
                placeholder="Enter Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Field>
            <Field label="Student First Name" required>
              <Input
                placeholder="Enter First Name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Field>
            <Field label="Student Middle Name" required>
              <Input
                placeholder="Enter Middle Name"
                value={middlename}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </Field>
            <Field label="Strand Program" required>
              <Input
                placeholder="Enter Strand Program (e.g., Animation, BSIT)"
                value={strandProgram}
                onChange={(e) => setStrandProgram(e.target.value)}
              />
            </Field>
            <Field label="Section" required>
              <Input
                placeholder="Enter Section (e.g., Gumamela)"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              />
            </Field>
            <Field label="Year Level" required>
              <Input
                placeholder="Enter Year Level (e.g., 2nd year, 11th grade)"
                value={yearLevel}
                onChange={(e) => setYearLevel(e.target.value)}
              />
            </Field>
            <Field label="School Level" required>
              <Input
                placeholder="Enter School Level (e.g., SHS, College)"
                value={schoolLevel}
                onChange={(e) => setSchoolLevel(e.target.value)}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              variant="outline"
              onClick={() => {
                clearFields();
                onClose();
              }}
            >
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button colorScheme="green" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
        <DialogCloseTrigger color="black" />
      </DialogContent>
    </DialogRoot>
  );
};

AddStudentModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
  studentData: PropTypes.shape({
    id: PropTypes.string,
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    middlename: PropTypes.string,
    strandProgram: PropTypes.string,
    section: PropTypes.string,
    yearLevel: PropTypes.string,
    schoolLevel: PropTypes.string,
  }),
};

export default AddStudentModal;
