import {z} from "zod";

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name cannot exceed 100 characters")
    .trim(),

  sku: z
    .string()
    .min(1, "SKU is required")
    .regex(
      /^[A-Z0-9-]+$/,
      "SKU must contain only uppercase letters, numbers, and hyphens",
    )
    .trim()
    .transform((val) => val.toUpperCase()),

  category: z.enum(
    ["Electronics", "Clothing", "Food", "Furniture", "Tools", "Other"],
    {errorMap: () => ({message: "Invalid category"})},
  ),

  price: z
    .number()
    .positive("Price must be positive")
    .finite("Price must be a finite number"),

  quantity: z
    .number()
    .int("Quantity must be an integer")
    .nonnegative("Quantity cannot be negative"),

  lowStockThreshold: z
    .number()
    .int("Low stock threshold must be an integer")
    .nonnegative("Low stock threshold cannot be negative")
    .default(10),
});

export const updateProductSchema = createProductSchema.partial();

export const queryProductSchema = z.object({
  category: z
    .enum(["Electronics", "Clothing", "Food", "Furniture", "Tools", "Other"])
    .optional(),
  lowStock: z.enum(["true", "false"]).optional(),
  search: z.string().optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
});
