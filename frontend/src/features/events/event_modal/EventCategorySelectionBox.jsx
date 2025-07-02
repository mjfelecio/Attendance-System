"use client";

import { Select, createListCollection } from "@chakra-ui/react";

export const EventCategorySelectionBox = () => {
  return (
    <Select.Root collection={eventCategories} size="sm" width="420px">
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select framework" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {eventCategories.items.map((category) => (
              <Select.Item item={category} key={category.value}>
                {category.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
    </Select.Root>
  );
};

const eventCategories = createListCollection({
  items: [
    { label: "School Event", value: "school" },
    { label: "College Event", value: "college" },
    { label: "SHS Event", value: "shs" },
    { label: "Department Event", value: "dept" },
    { label: "House Event", value: "house" },
    { label: "Year Specific Event", value: "year" },
    { label: "Custom", value: "custom" },
  ],
});
