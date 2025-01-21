import express from "express";
import { createAttendanceRecord, fetchRecord } from "../controllers/attendance.controller.js";
const router = express.Router();

router.post("/", createAttendanceRecord);
router.get("/fetch?", fetchRecord);
// router.put("/:eventId", editEvent);
// router.delete("/:eventId", deleteEvent);
// router.get("/fetch?", fetchEvent);

export default router;