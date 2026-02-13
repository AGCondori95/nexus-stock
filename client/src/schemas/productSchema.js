import {z} from "zod";
import {CATEGORIES} from "../utils/constants";

export const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name cannot exceed 100 characters"),

  sku: z
    .string()
    .min(1, "SKU is required")
    .regex(
      /^[A-Z0-9-]+$/,
      "SKU must contain only uppercase letters, numbers, and hyphens",
    )
    .transform((val) => val.toUpperCase()),

  category: z.enum(CATEGORIES, {
    errorMap: () => ({message: "Please select a valid category"}),
  }),

  price: z
    .number({invalid_type_error: "Price must be a number"})
    .positive("Price must be positive")
    .finite("Price must be a finite number"),

  quantity: z
    .number({invalid_type_error: "Quantity must be a number"})
    .int("Quantity must be an integer")
    .nonnegative("Quantity cannot be negative"),

  lowStockThreshold: z
    .number({invalid_type_error: "Threshold must be a number"})
    .int("Threshold must be an integer")
    .nonnegative("Threshold cannot be negative")
    .default(10),

  image: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) =>
        !files || files.length === 0 || files[0].size <= 5 * 1024 * 1024,
      "Image size must be less than 5MB",
    )
    .refine(
      (files) =>
        !files || files.length === 0 || files[0].type.startsWith("image/"),
      "Only image files are allowed",
    ),
});
