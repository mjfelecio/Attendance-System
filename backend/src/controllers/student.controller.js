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

export const fetchStudents = async (req, res) => {
    try {
        const students = await Student.findAll();

        if (!students || students.length === 0) throw new Error("No student in the database");

        res.status(201).json({
            success: true,
            message: "Students fetched successfully",
            data: students,
        });
    } catch (error) {
        if (error.message.includes("No student")) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the students",
        });
    }
};

export const editStudent = async (req, res) => {
    const { studentId } = req.params;
    const editDetails = req.body;

    try {
        const student = await Student.findByPk(studentId);

        if (!student) throw new Error("Student not found");

        const editedStudent = await student.update(editDetails);

        res.status(200).json({
            success: true,
            message: "Successfully edited student details",
            data: editedStudent,
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
            message: "An error occurred while editing student details",
        });
    }
};

export const deleteStudent = async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await Student.findByPk(studentId);

        if (!student) throw new Error("Student not found");

        await student.destroy({ force: true });

        res.status(200).json({
            success: true,
            message: "Successfully deleted student",
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
            message: "An error occurred while deleting student",
        });
    }
};

export const findStudent = async (req, res) => {
    const { USN } = req.query;

    try {
        const student = await Student.findByPk(USN);

        if (!student) throw new Error("Student not found");

        res.status(200).json({
            success: true,
            message: "Student found",
            data: student,
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
            message: "An error occurred while fetching student",
        });
    }
};
