import express from "express";
import {
  exportProducts,
  exportOrders,
  exportInventoryReport,
} from "../controllers/export.controller.js";
import {verifyToken} from "../middlewares/verifyToken.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

router.get("/products", exportProducts);
router.get("/orders", exportOrders);
router.get("/inventory-report", exportInventoryReport);

export default router;
