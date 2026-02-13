import axiosInstance from "./axios";

/**
 * Register new user
 * @param {Object} userData - User registration data
 * @returns {Promise} API response
 */
export const register = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

/**
 * Login user
 * @param {Object} credentials - User credentials
 * @returns {Promise} API response with tokens
 */
export const login = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);

  // Store access token and user data
  if (response.data.success) {
    localStorage.setItem("accessToken", response.data.data.accessToken);
    localStorage.setItem("user", JSON.stringify(response.data.data.user));
  }

  return response.data;
};

/**
 * Logout user
 * @returns {Promise} API response
 */
export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");

  // Clear local storage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  return response.data;
};

/**
 * Get current user profile
 * @returns {Promise} API response
 */
export const getProfile = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};

/**
 * Refresh access token
 * @returns {Promise} API response with new token
 */
export const refreshToken = async () => {
  const response = await axiosInstance.post("/auth/refresh");

  if (response.data.success) {
    localStorage.setItem("accessToken", response.data.data.accessToken);
  }

  return response.data;
};
