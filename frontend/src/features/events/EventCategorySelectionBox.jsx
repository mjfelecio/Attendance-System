"use client"

import {
  Combobox,
  HStack,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const EventCategorySelectionBox = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: eventTypes,
    filter: contains,
  })

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      width="420px"
	  openOnClick
    >
      <HStack gap={"12px"}>
        <Combobox.Label>Select Event Type: </Combobox.Label>
        <Combobox.Control>
          <Combobox.Input placeholder="Type to search" />
          <Combobox.IndicatorGroup>
            <Combobox.ClearTrigger />
            <Combobox.Trigger />
          </Combobox.IndicatorGroup>
        </Combobox.Control>
      </HStack>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.Empty>No items found</Combobox.Empty>
            {collection.items.map((item) => (
              <Combobox.Item item={item} key={item.value}>
                {item.label}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
    </Combobox.Root>
  )
}

const eventTypes = [
  { label: "School Event", value: "school" },
  { label: "College Event", value: "college" },
  { label: "SHS Event", value: "shs" },
  { label: "Department Event", value: "dept" },
  { label: "House Event", value: "house" },
  { label: "Year Specific Event", value: "year" },
  { label: "Custom", value: "custom" },
]
