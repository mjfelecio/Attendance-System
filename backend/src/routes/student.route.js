import express from "express";
import { addStudent, fetchStudents } from "../controllers/student.controller.js";

const router = express.Router();

router.post("/", addStudent);
router.get("/", fetchStudents);

export default router;