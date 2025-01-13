import { Box, Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentList from "./pages/StudentList";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Box minH={"100vh"} bgColor={"white"}>
      <Navbar />
      <Flex dir="row">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/student-list" element={<StudentList />}></Route>
        </Routes>
      </Flex>
    </Box>
  );
}

export default App;
