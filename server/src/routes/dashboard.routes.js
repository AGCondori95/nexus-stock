import express from "express";
import {
  getDashboardStats,
  getOverview,
} from "../controllers/dashboard.controller.js";
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

router.get("/stats", getDashboardStats);
router.get("/overview", getOverview);

export default router;
