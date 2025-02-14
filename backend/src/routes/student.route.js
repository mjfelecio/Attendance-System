import express from "express";
import {
    addStudent,
    deleteStudent,
    editStudent,
    fetchAttendedEvents,
    fetchStudents,
    findStudent,
} from "../controllers/student.controller.js";

const router = express.Router();

router.post("/", addStudent);
router.get("/", fetchStudents);
router.put("/:studentId", editStudent);
router.delete("/:studentId", deleteStudent);
router.get("/find", findStudent);
router.get("/events/:studentId", fetchAttendedEvents);

export default router;
