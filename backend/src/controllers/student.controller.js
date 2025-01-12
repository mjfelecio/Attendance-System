import { sequelize } from "../db/index.js";
import { Student } from "../models/student.model.js";

export const addStudent = async (req, res) => {
    const studentDetails = req.body;

    try {
        const newStudent = await Student.create(studentDetails);

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            data: newStudent,
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                success: false,
                message: "This student is already in the database",
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
