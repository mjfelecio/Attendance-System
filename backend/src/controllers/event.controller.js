import { Event } from "../models/event.model.js";


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

