import Product from "../models/Product.model.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../middlewares/upload.js";

/**
 * @route   GET /api/products
 * @desc    Get all products with filters and pagination
 * @access  Private
 */
export const getProducts = async (req, res, next) => {
  try {
    const {category, lowStock, search, page = 1, limit = 10} = req.query;

    // Build filter object
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (lowStock === "true") {
      filter.$expr = {$lte: ["$quantity", "$lowStockThreshold"]};
    }

    if (search) {
      filter.$or = [
        {name: {$regex: search, $options: "i"}},
        {sku: {$regex: search, $options: "i"}},
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("createdBy", "username email")
        .sort({createdAt: -1})
        .skip(skip)
        .limit(parseInt(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Private
 */
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "createdBy",
      "username email",
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: {product},
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/products
 * @desc    Create new product with optional image upload
 * @access  Private
 */
export const createProduct = async (req, res, next) => {
  try {
    const {name, sku, category, price, quantity, lowStockThreshold} = req.body;

    let imageUrl = null;

    // Upload image to Cloudinary if provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      imageUrl = result.secure_url;
    }

    // Create product
    const product = await Product.create({
      name,
      sku,
      category,
      price,
      quantity,
      lowStockThreshold,
      imageUrl,
      createdBy: req.user.id,
    });

    // Populate creator info
    await product.populate("createdBy", "username email");

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: {product},
    });
  } catch (error) {
    // If product creation fails after image upload, delete the uploaded image
    if (req.file && req.uploadedImageUrl) {
      await deleteFromCloudinary(req.uploadedImageUrl).catch(console.error);
    }
    next(error);
  }
};

/**
 * @route   PUT /api/products/:id
 * @desc    Update product with optional image replacement
 * @access  Private
 */
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {name, sku, category, price, quantity, lowStockThreshold} = req.body;
    const oldImageUrl = product.imageUrl;

    // Upload new image if provided
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      product.imageUrl = result.secure_url;
    }

    // Update fields
    if (name !== undefined) product.name = name;
    if (sku !== undefined) product.sku = sku;
    if (category !== undefined) product.category = category;
    if (price !== undefined) product.price = price;
    if (quantity !== undefined) product.quantity = quantity;
    if (lowStockThreshold !== undefined)
      product.lowStockThreshold = lowStockThreshold;

    await product.save();

    // Delete old image if a new one was uploaded
    if (req.file && oldImageUrl) {
      await deleteFromCloudinary(oldImageUrl).catch(console.error);
    }

    await product.populate("createdBy", "username email");

    res.json({
      success: true,
      message: "Product updated successfully",
      data: {product},
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product and its image
 * @access  Private
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Delete image from Cloudinary if exists
    if (product.imageUrl) {
      await deleteFromCloudinary(product.imageUrl).catch(console.error);
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/products/categories/list
 * @desc    Get all unique categories with product counts
 * @access  Private
 */
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: {$sum: 1},
        },
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          _id: 0,
        },
      },
      {
        $sort: {category: 1},
      },
    ]);

    res.json({
      success: true,
      data: {categories},
    });
  } catch (error) {
    next(error);
  }
};
