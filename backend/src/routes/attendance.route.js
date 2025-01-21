import express from "express";
import { createAttendanceRecord } from "../controllers/attendance.controller.js";
const router = express.Router();

router.post("/", createAttendanceRecord);
// router.get("/", fetchEvents);
// router.put("/:eventId", editEvent);
// router.delete("/:eventId", deleteEvent);
// router.get("/fetch?", fetchEvent);

export default router;