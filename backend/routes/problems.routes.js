import express from "express";
import { getTodayPlan,checkboxClicked } from "../controllers/problems.controller.js";

const router = express.Router();

router.get("/today",getTodayPlan);
router.patch("/:id/solve",checkboxClicked);

export default router;