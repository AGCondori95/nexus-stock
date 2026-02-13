import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import rateLimit from "express-rate-limit";

/**
 * Multer configuration to handle file uploads in memory
 */
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Accept only images
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

/**
 * Upload image buffer to Cloudinary
 * @param {Buffer} fileBuffer - Image buffer from multer
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<Object>} Upload result with secure_url
 */
export const uploadToCloudinary = (
  fileBuffer,
  folder = "nexusstock/products",
) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          {width: 800, height: 800, crop: "limit"}, // Max dimensions
          {quality: "auto"}, // Auto quality optimization
          {fetch_format: "auto"}, // Auto format (WebP when supported)
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    // Convert buffer to stream and pipe to cloudinary
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

/**
 * Delete image from Cloudinary
 * @param {string} imageUrl - Full Cloudinary URL
 * @returns {Promise<Object>} Deletion result
 */
export const deleteFromCloudinary = async (imageUrl) => {
  if (!imageUrl) return null;

  try {
    // Extract public_id from URL
    // Example: https://res.cloudinary.com/demo/image/upload/v1234/nexusstock/products/abc123.jpg
    const parts = imageUrl.split("/");
    const fileWithExtension = parts[parts.length - 1];
    const publicId = `${parts[parts.length - 2]}/${fileWithExtension.split(".")[0]}`;

    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
};

/**
 * Rate limiter for file uploads to prevent abuse
 */
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // Limita cada IP a 20 subidas por ventana
  message: "Too many uploads from this IP, please try again after 15 minutes",
  standardHeaders: true,
  legacyHeaders: false,
});
