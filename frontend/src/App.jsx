import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentList from "./pages/StudentList";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box minH={"100vh"} bgColor={"white"}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/student-list" element={<StudentList />}></Route>
      </Routes>
    </Box>
  );
}

export default App;
