import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import ManageList from "./pages/ManageList";
import Settings from "./pages/Settings";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import EventTakeAttendance from "./pages/EventTakeAttendance";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/Signup" element={<Navigate to="/signup" replace />} />
      <Route path="/" element={
        <ProtectedRoute>
          <Navigate to="/dashboard" replace />
        </ProtectedRoute>
      } />
      <Route path="/*" element={
        <ProtectedRoute>
          <Flex direction="column" h="100vh">
            <Navbar toggleSidebar={toggleSidebar} />
            <Flex flex={1} h="calc(100vh - 50px)" overflow="hidden" pos="relative">
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
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/calendar" element={<CalendarPage isResized={isSidebarOpen} />} />
                  <Route path="/manage" element={<ManageList />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/events/attendance" element={<EventTakeAttendance />} />
                  <Route path="/events/new" element={<div>Create New Event</div>} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Box>
            </Flex>
          </Flex>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default App;
