import { DataTypes, ValidationError } from "sequelize";
import { sequelize } from "../db/index.js";

export const Event = sequelize.define("Event", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: ["Name is required"],
            },
        },
    },
    description: {
        type: DataTypes.TEXT,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: {
                msg: ["Invalid date"],
            },
        },
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            isValidTime(value) {
                // Time must be in HH:mm:ss format
                const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
                if (!timeRegex.test(value)) {
                    console.log(value);
                    throw new ValidationError("Invalid time format. Please use HH:mm");
                }
            },
        },
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
        validate: {
            isValidTime(value) {
                // Time must be in HH:mm:ss format
                const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
                if (!timeRegex.test(value)) {
                    console.log(value);
                    throw new ValidationError("Invalid time format. Please use HH:mm");
                }
            },
        },
    },
});
