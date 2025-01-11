import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_STORAGE,
});

export const connectDB = async () => {
    try {
        await sequelize.sync();
        await sequelize.authenticate();
        console.log("Database connected")
    } catch (error) {
        console.error('Connection failed:', error);
        process.exit(1);
    }
}