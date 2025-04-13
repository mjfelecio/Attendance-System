import { Button, Menu, Portal } from "@chakra-ui/react"
import { HiSortAscending } from "react-icons/hi"
import { LuChevronRight } from "react-icons/lu"

const SortBy = () => {
  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiSortAscending style={{ marginRight: "0.5rem" }} />
          Filter
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="12rem">
            {/* College */}
            <Menu.Root positioning={{ placement: "right-start", gutter: 4 }}>
              <Menu.TriggerItem>
                College <LuChevronRight />
              </Menu.TriggerItem>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="cs">CS Department</Menu.Item>
                    <Menu.Item value="ba">BA Department</Menu.Item>
                    <Menu.Item value="hm">HM Department</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>

            {/* Senior High School */}
            <Menu.Root positioning={{ placement: "right-start", gutter: 4 }}>
              <Menu.TriggerItem>
                Senior High School <LuChevronRight />
              </Menu.TriggerItem>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="stem">STEM</Menu.Item>
                    <Menu.Item value="abm">ABM</Menu.Item>
                    <Menu.Item value="gas">GAS</Menu.Item>
                    <Menu.Item value="humss">HUMSS</Menu.Item>

                    {/* TVL Submenu */}
                    <Menu.Root positioning={{ placement: "right-start", gutter: 4 }}>
                      <Menu.TriggerItem>
                        TVL <LuChevronRight />
                      </Menu.TriggerItem>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content>
                            <Menu.Item value="programming">Programming</Menu.Item>
                            <Menu.Item value="animation">Animation</Menu.Item>
                            <Menu.Item value="he">Home Economics</Menu.Item>
                            <Menu.Item value="css">CSS</Menu.Item>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>

            {/* House */}
            <Menu.Root positioning={{ placement: "right-start", gutter: 4 }}>
              <Menu.TriggerItem>
                House <LuChevronRight />
              </Menu.TriggerItem>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="giallio">Giallio</Menu.Item>
                    <Menu.Item value="cahel">Cahel</Menu.Item>
                    <Menu.Item value="vierrdy">Vierrdy</Menu.Item>
                    <Menu.Item value="roxxo">Roxxo</Menu.Item>
                    <Menu.Item value="azul">Azul</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default SortBy
