import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_STORAGE,
});

export const connectDB = async () => {
    try {
        // Clears the database every time you connect to it for development purposes
        await sequelize.sync({ force: true });
        await sequelize.authenticate();
        console.log("Database connected");
    } catch (error) {
        console.error("Connection failed:", error);
        process.exit(1);
    }
};
