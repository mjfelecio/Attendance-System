import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import ManageList from "./pages/ManageList";
import Settings from "./pages/Settings";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import EventTakeAttendance from "./pages/EventTakeAttendance";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/*" element={
        <Flex direction="column" h="100vh">
          {/* Navbar is part of the main app layout, not shown on login */}
          <Navbar toggleSidebar={toggleSidebar} />
          <Flex flex={1} h="calc(100vh - 50px)" overflow="hidden" pos="relative">
            {/* Sidebar is part of the main app layout, not shown on login */}
            <Sidebar isOpen={isSidebarOpen} />
            <Box
              flex={1}
              p={6}
              transition="margin-left 0.5s ease"
              ml={isSidebarOpen ? "250px" : "0"}
              bg="white"
              overflow="auto"
            >
              <Routes>
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="/CalendarPage" element={<CalendarPage isResized={isSidebarOpen} />} />
                <Route path="/ManageList" element={<ManageList />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/EventTakeAttendance" element={<EventTakeAttendance />} />
              </Routes>
            </Box>
          </Flex>
        </Flex>
      } />
    </Routes>
  );
};

export default App;
