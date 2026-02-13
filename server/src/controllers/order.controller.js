import mongoose from "mongoose";
import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js";

/**
 * @route   POST /api/orders
 * @desc    Create new order with automatic stock deduction (uses MongoDB transactions)
 * @access  Private
 */
export const createOrder = async (req, res, next) => {
  // Start a MongoDB session for transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {items, customerName, customerEmail, notes} = req.body;

    // Validate and calculate order details
    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      // Find product with session lock
      const product = await Product.findById(item.productId).session(session);

      if (!product) {
        throw new Error(`Product with ID ${item.productId} not found`);
      }

      // Check stock availability
      if (product.quantity < item.quantity) {
        throw new Error(
          `Insufficient stock for ${product.name}. Available: ${product.quantity}, Requested: ${item.quantity}`,
        );
      }

      // Calculate subtotal
      const subtotal = product.price * item.quantity;

      // Prepare order item
      orderItems.push({
        product: product._id,
        productName: product.name,
        sku: product.sku,
        quantity: item.quantity,
        priceAtPurchase: product.price,
        subtotal,
      });

      // Deduct stock
      product.quantity -= item.quantity;
      await product.save({session});

      totalAmount += subtotal;
    }

    // Create order
    const order = await Order.create(
      [
        {
          items: orderItems,
          totalAmount,
          customerName,
          customerEmail,
          notes,
          createdBy: req.user.id,
        },
      ],
      {session},
    );

    // Commit transaction
    await session.commitTransaction();

    // Populate order details
    await order[0].populate("createdBy", "username email");

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: {order: order[0]},
    });
  } catch (error) {
    // Rollback transaction on error
    await session.abortTransaction();
    next(error);
  } finally {
    // End session
    session.endSession();
  }
};

/**
 * @route   GET /api/orders
 * @desc    Get all orders with pagination
 * @access  Private
 */
export const getOrders = async (req, res, next) => {
  try {
    const {page = 1, limit = 10, status} = req.query;

    const filter = {};
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find(filter)
        .populate("createdBy", "username email")
        .populate("items.product", "name sku")
        .sort({createdAt: -1})
        .skip(skip)
        .limit(parseInt(limit)),
      Order.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        orders,
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
 * @route   GET /api/orders/:id
 * @desc    Get single order by ID
 * @access  Private
 */
export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("createdBy", "username email")
      .populate("items.product", "name sku imageUrl");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: {order},
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PATCH /api/orders/:id/status
 * @desc    Update order status
 * @access  Private
 */
export const updateOrderStatus = async (req, res, next) => {
  try {
    const {status} = req.body;

    if (!["pending", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {status},
      {new: true, runValidators: true},
    ).populate("createdBy", "username email");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order status updated successfully",
      data: {order},
    });
  } catch (error) {
    next(error);
  }
};
