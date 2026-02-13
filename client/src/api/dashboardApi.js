import axiosInstance from "./axios";

/**
 * Get dashboard statistics
 * @returns {Promise} API response
 */
export const getDashboardStats = async () => {
  const response = await axiosInstance.get("/dashboard/stats");
  return response.data;
};

/**
 * Get dashboard overview
 * @returns {Promise} API response
 */
export const getDashboardOverview = async () => {
  const response = await axiosInstance.get("/dashboard/overview");
  return response.data;
};
