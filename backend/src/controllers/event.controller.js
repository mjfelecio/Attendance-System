import { Attendance, Event } from "../models/index.js";


export const createEvent = async (req, res) => {
    const eventDetails = req.body;

    try {
        const createdEvent = await Event.create(eventDetails);

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            data: createdEvent,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const fetchEvents = async (req, res) => {
    try {
        const events = await Event.findAll();

        if (!events || events.length === 0) throw new Error("No event found");

        res.status(201).json({
            success: true,
            message: "Events fetched successfully",
            data: events,
        });
    } catch (error) {
        if (error.message.includes("No event")) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the events",
        });
    }
};

export const editEvent = async (req, res) => {
    const { eventId } = req.params;
    const editDetails = req.body;

    try {
        const event = await Event.findByPk(eventId);

        if (!event) throw new Error("Event not found");

        const editedStudent = await event.update(editDetails);

        res.status(200).json({
            success: true,
            message: "Successfully edited event details",
            data: editedStudent,
        });
    } catch (error) {
        if (error.message.includes("not found")) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "An error occurred while editing event details",
        });
    }
};

export const deleteEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findByPk(eventId);

        if (!event) throw new Error("Event not found");

        await event.destroy({ force: true });

        res.status(200).json({
            success: true,
            message: "Successfully deleted event",
        });
    } catch (error) {
        if (error.message.includes("not found")) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "An error occurred while deleting event",
        });
    }
};

export const fetchEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        const event = await Event.findByPk(eventId);

        if (!event) throw new Error("Event not found");

        res.status(200).json({
            success: true,
            message: "Event found",
            data: event,
        });
    } catch (error) {
        if (error.message.includes("not found")) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching event",
        });
    }
};

export const fetchEventAttendanceRecords = async (req, res) => {
    const { eventId } = req.params;

    try {
        const eventRecords = await Event.findOne({
            where: {
                id: eventId,
            },
            include: [{
                model: Attendance,
            }]
        });

        if (!eventRecords) throw new Error("Event not found");

        if (eventRecords.Attendances.length === 0) {
            throw new Error("No attendance records for this event");
        }

        res.status(200).json({
            success: true,
            message: "Event found",
            data: eventRecords,
        });
    } catch (error) {        
        if (error.message.includes("not found")) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message.includes("No attendance")) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }
        
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching event attendance records",
        });
    }
};