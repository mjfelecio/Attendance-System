import express from "express";
import { createAttendanceRecord, deleteRecord, editRecord, fetchRecord } from "../controllers/attendance.controller.js";
const router = express.Router();

router.post("/", createAttendanceRecord);
router.get("/:recordId", fetchRecord);
router.put("/:recordId", editRecord);
router.delete("/:recordId", deleteRecord);

export default router;