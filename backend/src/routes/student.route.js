import express from "express";
import { addStudent, editStudent, fetchStudents } from "../controllers/student.controller.js";

const router = express.Router();

router.post("/", addStudent);
router.get("/", fetchStudents);
router.put("/:studentId", editStudent);

export default router;