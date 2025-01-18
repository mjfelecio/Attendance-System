import express from "express";
import { createEvent, deleteEvent, editEvent, fetchEvent, fetchEvents } from "../controllers/event.controller.js";

const router = express.Router();

router.post("/", createEvent);
router.get("/", fetchEvents);
router.put("/:eventId", editEvent);
router.delete("/:eventId", deleteEvent);
router.get("/fetch?", fetchEvent);

export default router;