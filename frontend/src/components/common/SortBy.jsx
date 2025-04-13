
import { Button } from "@chakra-ui/react"
import {
  MenuContent,
  MenuRadioItem,
  MenuRadioItemGroup,
  MenuRoot,
  MenuTrigger,
} from "../ui/menu"
import { useState } from "react"
import { HiSortAscending } from "react-icons/hi"

const SortBy = () => {
  const [value, setValue] = useState("asc")
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <Button variant="outline" size="sm">
          <HiSortAscending /> Filter
        </Button>
      </MenuTrigger>
      <MenuContent minW="10rem">
        <MenuRadioItemGroup
          value={value}
          onValueChange={(e) => setValue(e.value)}
        >
          <MenuRadioItem value="col">College</MenuRadioItem>
          <MenuRadioItem value="shs">Senior High School</MenuRadioItem>
          <MenuRadioItem value="hos">House</MenuRadioItem>
        </MenuRadioItemGroup>
      </MenuContent>
    </MenuRoot>
  )
}

export default SortBy;
