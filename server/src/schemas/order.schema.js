import {z} from "zod";

const orderItemSchema = z.object({
  productId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID"),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .positive("Quantity must be positive"),
});

export const createOrderSchema = z.object({
  items: z
    .array(orderItemSchema)
    .min(1, "Order must contain at least one item"),

  customerName: z
    .string()
    .min(1, "Customer name is required")
    .max(100, "Customer name cannot exceed 100 characters")
    .trim(),

  customerEmail: z.string().email("Invalid email format").toLowerCase(),

  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),
});
