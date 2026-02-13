import express from "express";
import {
  register,
  login,
  refreshToken,
  logout,
  getProfile,
} from "../controllers/auth.controller.js";
import {validateSchema} from "../middlewares/validateSchema.js";
import {verifyToken} from "../middlewares/verifyToken.js";
import {registerSchema, loginSchema} from "../schemas/auth.schema.js";

const router = express.Router();

// Public routes
router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/refresh", refreshToken);

// Protected routes
router.post("/logout", verifyToken, logout);
router.get("/profile", verifyToken, getProfile);

export default router;
