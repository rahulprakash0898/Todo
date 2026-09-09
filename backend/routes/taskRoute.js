import express from "express";
import { addTask, getTask, removeTask, markDone } from "../controllers/taskController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/addTask", requireAuth, addTask);
router.get("/getTask", requireAuth, getTask);
router.post("/removeTask", requireAuth, removeTask);
router.delete("/removeTask", requireAuth, removeTask);
router.delete("/removeTask/:id", requireAuth, removeTask);
router.post("/markDone", requireAuth, markDone);
router.put("/markDone", requireAuth, markDone);
router.put("/markDone/:id", requireAuth, markDone);

export default router;