import { Attendance } from "../models/index.js";

export const createAttendanceRecord = async (req, res) => {
    const recordDetails = req.body;
    const { eventId, studentId } = recordDetails;

    try {
        const duplicateRecord = await Attendance.findOne({
            where: {
                eventId,
                studentId,
            },
        });

        if (duplicateRecord) {
            throw Error("This student already has an attendance record.");
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

export const fetchRecord = async (req, res) => {
    const { recordId } = req.params;

    try {
        const attendanceRecord = await Attendance.findByPk(recordId);

        if (!attendanceRecord) throw new Error("Attendance record not found");

        res.status(200).json({
            success: true,
            message: "Attendance record found",
            data: attendanceRecord,
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
            message: "An error occurred while fetching attendance record",
        });
    }
};

export const editRecord = async (req, res) => {
    const { recordId } = req.params;
    const editDetails = req.body;

    try {
        const attendanceRecord = await Attendance.findByPk(recordId);

        if (!attendanceRecord) throw new Error("Attendance record not found");

        const editedRecord = await attendanceRecord.update(editDetails);

        res.status(200).json({
            success: true,
            message: "Successfully edited attendance record details",
            data: editedRecord,
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
            message: "An error occurred while editing attendance record details",
        });
    }
};

export const deleteRecord = async (req, res) => {
    const { recordId } = req.params;

    try {
        const attendanceRecord = await Attendance.findByPk(recordId);

        if (!attendanceRecord) throw new Error("Attendance record not found");

        await attendanceRecord.destroy({ force: true });

        res.status(200).json({
            success: true,
            message: "Successfully deleted attendance record",
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
            message: "An error occurred while deleting attendance record",
        });
    }
};
