import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import ManageList from "./pages/ManageList";
import Settings from "./pages/Settings";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import { useState } from "react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Flex flexDirection="column" h="100vh">
      <Navbar toggleSidebar={toggleSidebar} />
      <Flex
        flex={1}
        h="calc(100vh - 50px)"
        overflow="hidden"
        position="relative"
      >
        <Sidebar isOpen={isSidebarOpen} />
        <Box
          flex={1}
          p={6}
          transition="margin-left 0.5s ease"
          ml={isSidebarOpen ? "250px" : "0px"}
          bg="gray.100"
          position="relative"
          zIndex="base"
          overflow={"auto"}
        >
          <Routes>
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/CalendarPage" element={<CalendarPage />} />
            <Route path="/ManageList" element={<ManageList />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </Box>
      </Flex>
    </Flex>
  );
}

export default App;
