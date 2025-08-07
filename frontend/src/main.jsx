import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider as ChakraProviderWrapper } from "./components/snippets/provider";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/provider/AuthProvider";
import { ConfirmationModalProvider } from "./context/ConfirmationModalProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProviderWrapper>
        <AuthProvider>
          <ConfirmationModalProvider>
            <App />
          </ConfirmationModalProvider>
        </AuthProvider>
      </ChakraProviderWrapper>
    </BrowserRouter>
  </StrictMode>,
);
