import express from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} from "../controllers/product.controller.js";
import {verifyToken} from "../middlewares/verifyToken.js";
import {validateSchema} from "../middlewares/validateSchema.js";
import {upload, uploadLimiter} from "../middlewares/upload.js";
import {
  createProductSchema,
  updateProductSchema,
  queryProductSchema,
} from "../schemas/product.schema.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Category list
router.get("/categories/list", getCategories);

// CRUD routes
router.get(
  "/",
  (req, res, next) => {
    try {
      queryProductSchema.parse(req.query);
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid query parameters",
        errors: error.errors,
      });
    }
  },
  getProducts,
);

router.get("/:id", getProductById);

router.post(
  "/",
  uploadLimiter,
  upload.single("image"),
  (req, res, next) => {
    // Parse numeric fields from multipart form data
    if (req.body.price) req.body.price = parseFloat(req.body.price);
    if (req.body.quantity) req.body.quantity = parseInt(req.body.quantity);
    if (req.body.lowStockThreshold)
      req.body.lowStockThreshold = parseInt(req.body.lowStockThreshold);
    next();
  },
  validateSchema(createProductSchema),
  createProduct,
);

router.put(
  "/:id",
  uploadLimiter,
  upload.single("image"),
  (req, res, next) => {
    if (req.body.price) req.body.price = parseFloat(req.body.price);
    if (req.body.quantity) req.body.quantity = parseInt(req.body.quantity);
    if (req.body.lowStockThreshold)
      req.body.lowStockThreshold = parseInt(req.body.lowStockThreshold);
    next();
  },
  validateSchema(updateProductSchema),
  updateProduct,
);

router.delete("/:id", deleteProduct);

export default router;
