import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

export const Attendance = sequelize.define("Attendance", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    studentId: { // Foreign Key
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    eventId: { // Foreign Key
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isLate: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    createdAt: "markedAt"
});
