import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import ManageList from "./pages/ManageList";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box minH="100vh" bgColor="black">
      <Navbar />
    </Box>
  );
}

export default App;