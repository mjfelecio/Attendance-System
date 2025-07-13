import { DataTypes } from "sequelize";
import { sequelize } from "../db/index.js";

export const Otp = sequelize.define("Otp", {
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});
