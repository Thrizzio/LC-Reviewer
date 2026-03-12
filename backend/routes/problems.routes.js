import express from "express";
import { getTodayPlan } from "../controllers/problems.controller";

const router = express.Router();

router.get("/today",getTodayPlan);

export default router;