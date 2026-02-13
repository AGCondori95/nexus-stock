import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import {verifyToken} from "../middlewares/verifyToken.js";
import {validateSchema} from "../middlewares/validateSchema.js";
import {createOrderSchema} from "../schemas/order.schema.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

router.post("/", validateSchema(createOrderSchema), createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.patch("/:id/status", updateOrderStatus);

export default router;
