import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./src/db/index.js";
import studentRoutes from "./src/routes/student.route.js";
import eventRoutes from "./src/routes/event.route.js";
import attendanceRoutes from "./src/routes/attendance.route.js";
import authRoutes from "./src/routes/auth.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/student", studentRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
});
