"use client"

import {
  Dialog,
  Field,
  Input,
  Button,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { useRef } from "react";

const addStudentModal = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <Dialog.Root initialFocusEl={() => ref.current}>
      <Dialog.Trigger asChild>
        <Button
          variant="ghost"
          color="black"
          position="absolute"
          top="10px"
          right="10px"
          zIndex={1}
          _hover={{ bg: "gray.100" }}
          aria-label="Add Student"
        >
          <i className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="black"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path d="M15 14c-2.33 0-7 1.17-7 3.5V20h14v-2.5c0-2.33-4.67-3.5-7-3.5zm0-2c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-6 4v1H3v-1c0-1.66 3.58-2.5 6-2.5s6 .84 6 2.5zm3-6c0-1.66-1.34-3-3-3S6 8.34 6 10s1.34 3 3 3 3-1.34 3-3z" />
            </svg>
          </i>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Add Student</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>USN</Field.Label>
                  <Input placeholder="Enter USN" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Last Name</Field.Label>
                  <Input ref={ref} placeholder="Enter Last Name" />
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
              <Button colorScheme="blue">Import CSV</Button>
              <Button colorScheme="green">Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default addStudentModal;
