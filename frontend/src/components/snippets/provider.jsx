
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { PortalManager } from "@chakra-ui/portal";
import { ColorModeProvider } from "./color-mode";

export function Provider({ children }) {
  return (
    <ChakraProvider value={defaultSystem}>
      <PortalManager>
        <ColorModeProvider>{children}</ColorModeProvider>
      </PortalManager>
    </ChakraProvider>
  );
}
