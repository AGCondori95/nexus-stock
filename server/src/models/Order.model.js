import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"],
  },
  priceAtPurchase: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"],
  },
  subtotal: {
    type: Number,
    required: true,
    min: [0, "Subtotal cannot be negative"],
  },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      default: () => `ORD-${Date.now()}`,
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one item",
      },
    },
    totalAmount: {
      type: Number,
      required: true,
      min: [0, "Total amount cannot be negative"],
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "completed",
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, "Customer email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Index for faster queries
orderSchema.index({createdAt: -1});
orderSchema.index({createdBy: 1});

// Generate unique order number before saving
orderSchema.pre("save", async function () {
  if (this.isNew) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    // Find count of orders created today
    const todayStart = new Date(date.setHours(0, 0, 0, 0));
    const count = await this.constructor.countDocuments({
      createdAt: {$gte: todayStart},
    });

    this.orderNumber = `ORD-${year}${month}${day}-${String(count + 1).padStart(4, "0")}`;
  }
});

export default mongoose.model("Order", orderSchema);
