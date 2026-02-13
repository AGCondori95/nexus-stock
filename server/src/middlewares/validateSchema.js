/**
 * Middleware to validate request body against Zod schema
 * @param {ZodSchema} schema - Zod validation schema
 * @returns {Function} Express middleware
 */
export const validateSchema = (schema) => {
  return (req, res, next) => {
    try {
      // Parse and validate request body
      schema.parse(req.body);
      next();
    } catch (error) {
      // Format Zod errors
      const errors = error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res
        .status(400)
        .json({success: false, message: "Validation failed", errors});
    }
  };
};
