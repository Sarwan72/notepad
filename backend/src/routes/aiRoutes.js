import express from "express";
import { summarizeBot } from "../controllers/ai.controller.js";

const router = express.Router();


router.post("/summarize", summarizeBot);

export default router;
