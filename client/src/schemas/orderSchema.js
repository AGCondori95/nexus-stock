import {z} from "zod";

const orderItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  quantity: z
    .number({invalid_type_error: "Quantity must be a number"})
    .int("Quantity must be an integer")
    .positive("Quantity must be positive"),
});

export const orderSchema = z.object({
  items: z
    .array(orderItemSchema)
    .min(1, "Order must contain at least one item"),

  customerName: z
    .string()
    .min(1, "Customer name is required")
    .max(100, "Customer name cannot exceed 100 characters"),

  customerEmail: z.string().email("Invalid email format").toLowerCase(),

  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
});
