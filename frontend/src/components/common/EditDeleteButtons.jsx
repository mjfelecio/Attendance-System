import {Button, HStack} from '@chakra-ui/react'
import { CiEdit } from "react-icons/ci";
import { CiTrash } from "react-icons/ci";

const EditDeleteButtons = () => {

  return (
    <HStack>
      <Button colorPalette="blue" variant="solid" size="xs">
        <CiEdit /> Edit
      </Button>
      <Button colorPalette="blue" variant="outline" size="xs">
        Delete <CiTrash />
      </Button>
    </HStack>
  )
}

export default EditDeleteButtons;
