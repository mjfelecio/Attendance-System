import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

export const Student = sequelize.define("Student", {
    id: {
        // Student USN
        type: DataTypes.INTEGER,
        autoIncrement: true, // autoincrement for development purposes only
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    strandProgram: {
        // Animation or BSIT
        type: DataTypes.STRING,
        allowNull: false,
    },
    section: {
        // Section Gumamela
        type: DataTypes.STRING,
        allowNull: false,
    },
    yearLevel: {
        // 2nd year, or 11th grader
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    schoolLevel: {
        // SHS or College
        type: DataTypes.STRING,
        allowNull: false,
    },
});
