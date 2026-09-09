import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import userRouter from "./routes/userRoute.js";
import taskRouter from "./routes/taskRoute.js";
import forgotPasswordRouter from "./routes/forgotPassword.js";

// Load environment variables from backend directory or root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
mongoose.set('strictQuery', true);

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Database connection
const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        console.warn("Warning: MONGO_URI is not defined in environment variables.");
        return;
    }
    if (mongoose.connection.readyState >= 1) return;
    try {
        await mongoose.connect(mongoUri);
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
    }
};

connectDB();

// Health Check & Root API Endpoints
app.get("/", (req, res) => {
    res.json({ status: "OK", message: "Todo App Backend API is running smoothly", author: "Rahul Prakash" });
});

app.get("/api", (req, res) => {
    res.json({ status: "OK", message: "Todo App API is active", author: "Rahul Prakash" });
});

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/task", taskRouter);
app.use("/api/forgotPassword", forgotPasswordRouter);

// Start server if not running in serverless / imported environment
if (!process.env.VERCEL) {
    app.listen(port, () => console.log(`Server listening on port: ${port}`));
}

export default app;