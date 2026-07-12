import express from "express";

import { createExpense, getUsages, getSummary } from "../controllers/expense.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createExpense);
router.get("/", authMiddleware, getUsages);
router.get("/summary", authMiddleware, getSummary);

export default router;