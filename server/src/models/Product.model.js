import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name cannot exceed 100 characters"],
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      uppercase: true,
      trim: true,
      match: [
        /^[A-Z0-9-]+$/,
        "SKU must contain only uppercase letters, numbers, and hyphens",
      ],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: [
          "Electronics",
          "Clothing",
          "Food",
          "Furniture",
          "Tools",
          "Other",
        ],
        message: "{VALUE} is not a valid category",
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
      set: (value) => Math.round(value * 100) / 100,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [0, "Quantity cannot be negative"],
      default: 0,
    },
    lowStockThreshold: {
      type: Number,
      required: [true, "Low stock threshold is required"],
      default: 10,
    },
    imageUrl: {
      type: String,
      default: null,
      match: [/^https?:\/\/.+/, "Please provide a valid URL"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {timestamps: true, versionKey: false},
);

// Virtual field to check if stock is low
productSchema.virtual("isLowStock").get(function () {
  return this.quantity <= this.lowStockThreshold;
});

// Ensure virtuals are included in JSON
productSchema.set("toJSON", {virtuals: true});

// Index for faster queries
productSchema.index({category: 1});
productSchema.index({createdBy: 1});

export default mongoose.model("Product", productSchema);
