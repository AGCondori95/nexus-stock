import jwt from "jsonwebtoken";

/**
 * Generates Access Token (short-lived)
 * @param {Object} payload - User data to encode
 * @returns {string} JWT token
 */
export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  });
};

/**
 * Generates Refresh Token (long-lived)
 * @param {Object} payload - User data to encode
 * @returns {string} JWT token
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};

/**
 * Verifies Access Token
 * @param {string} token - JWT to verify
 * @returns {Object} Decoded payload
 */
export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
};

/**
 * Verifies Refresh Token
 * @param {string} token - JWT to verify
 * @returns {Object} Decoded payload
 */
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
