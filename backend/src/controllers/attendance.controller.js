import { Attendance } from "../models/index.js";

export const createAttendanceRecord = async (req, res) => {
    const recordDetails = req.body;
    const { eventId, studentId } = recordDetails;

    try {
        const duplicateRecord = await Attendance.findAll({
            where: {
                eventId,
                studentId,
            },
        });

        if (duplicateRecord.length !== 0) {
            throw Error("This student already has an attendance record.")
        }

        const attendanceRecord = await Attendance.create(recordDetails);

        res.status(201).json({
            success: true,
            message: "Attendance recorded successfully",
            data: attendanceRecord,
        });
    } catch (error) {
        if (error.message.includes("already has")) {
            return res.status(409).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message.includes("SQLITE_CONSTRAINT")) {
            return res.status(409).json({
                success: false,
                message: "An attendance record must be connected to a studentId and eventId",
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
