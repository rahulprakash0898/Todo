import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

// Safe mail sending helper
const sendMail = async (email, subject, title, description) => {
    const user = process.env.GMAIL_USERNAME?.trim();
    const pass = process.env.GMAIL_PASSWORD?.trim();
    if (!user || !pass) {
        return; // SMTP not configured, skip email quietly
    }
    try {
        const transporter = createTransport({
            service: 'gmail',
            auth: { user, pass }
        });

        const mailOptions = {
            from: `"Todo App" <${user}>`,
            to: email,
            subject: subject,
            html: `<h1>Task added successfully</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3>`
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email notification:", error.message);
    }
};

// Add Task
const addTask = async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;
    try {
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }
        const user = await userModel.findById(userId);
        const newTask = new taskModel({ title, description, completed: false, userId });
        const savedTask = await newTask.save();

        if (user && user.email) {
            sendMail(user.email, "Task Added Successfully", title, description).catch(err => console.error(err));
        }

        return res.status(200).json({ message: "Task added successfully", task: savedTask });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update / Edit Task
const updateTask = async (req, res) => {
    const id = req.body.id || req.params.id;
    const { title, description } = req.body;
    const userId = req.user.id;
    try {
        if (!id) {
            return res.status(400).json({ message: "Task ID is required" });
        }
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required" });
        }
        const task = await taskModel.findOne({ _id: id, userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        task.title = title.trim();
        task.description = description.trim();
        const updatedTask = await task.save();

        return res.status(200).json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Remove Task
const removeTask = async (req, res) => {
    const id = req.body.id || req.params.id || req.query.id;
    const userId = req.user.id;
    try {
        if (!id) {
            return res.status(400).json({ message: "Task ID is required" });
        }
        const deletedTask = await taskModel.findOneAndDelete({ _id: id, userId });
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }
        return res.status(200).json({ message: "Task deleted successfully", id });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Mark Done / Toggle Complete
const markDone = async (req, res) => {
    const id = req.body.id || req.params.id;
    const userId = req.user.id;
    try {
        if (!id) {
            return res.status(400).json({ message: "Task ID is required" });
        }
        const task = await taskModel.findOne({ _id: id, userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found or unauthorized" });
        }

        task.completed = req.body.completed !== undefined ? req.body.completed : !task.completed;
        const updatedTask = await task.save();

        return res.status(200).json({ message: "Task status updated successfully", task: updatedTask });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all Tasks for authenticated user
const getTask = async (req, res) => {
    try {
        const tasks = await taskModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { addTask, getTask, removeTask, markDone, updateTask };
