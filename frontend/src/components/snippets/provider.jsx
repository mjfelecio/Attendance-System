
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { PortalManager } from "@chakra-ui/portal";
import { ColorModeProvider } from "./color-mode";

export function Provider(props) {
  return (
    <ChakraProvider value={defaultSystem}>
      <PortalManager>
        <ColorModeProvider {...props}/>
      </PortalManager>
    </ChakraProvider>
  );
}
