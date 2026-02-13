import {z} from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores",
    ),

  email: z.string().email("Invalid email format").toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase(),

  password: z.string().min(1, "Password is required"),
});
