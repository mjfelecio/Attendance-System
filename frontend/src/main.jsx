import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "./components/snippets/provider";
import { BrowserRouter } from "react-router-dom";
import { ConfirmationModalProvider } from "./context/ConfirmationModalProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        <ConfirmationModalProvider>
          <App />
        </ConfirmationModalProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
);
