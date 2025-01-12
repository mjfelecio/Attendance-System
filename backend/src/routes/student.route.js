import express from "express";
import { addStudent } from "../controllers/student.controller.js";

const router = express.Router();

router.post("/", addStudent);

export default router;