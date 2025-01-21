import express from "express";
import { createAttendanceRecord, editRecord, fetchRecord } from "../controllers/attendance.controller.js";
const router = express.Router();

router.post("/", createAttendanceRecord);
router.get("/:recordId", fetchRecord);
router.put("/:recordId", editRecord);
// router.delete("/:eventId", deleteEvent);
// router.get("/fetch?", fetchEvent);

export default router;