import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider as ChakraProviderWrapper } from "./components/snippets/provider";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./features/auth/provider/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ChakraProviderWrapper>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ChakraProviderWrapper>
    </BrowserRouter>
  </StrictMode>
);
