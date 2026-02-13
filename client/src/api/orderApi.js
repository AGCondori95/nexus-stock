import axiosInstance from "./axios";

/**
 * Create new order
 * @param {Object} orderData - Order data
 * @returns {Promise} API response
 */
export const createOrder = async (orderData) => {
  const response = await axiosInstance.post("/orders", orderData);
  return response.data;
};

/**
 * Get all orders
 * @param {Object} params - Query parameters
 * @returns {Promise} API response
 */
export const getOrders = async (params = {}) => {
  const response = await axiosInstance.get("/orders", {params});
  return response.data;
};

/**
 * Get single order by ID
 * @param {string} id - Order ID
 * @returns {Promise} API response
 */
export const getOrderById = async (id) => {
  const response = await axiosInstance.get(`/orders/${id}`);
  return response.data;
};

/**
 * Update order status
 * @param {string} id - Order ID
 * @param {string} status - New status
 * @returns {Promise} API response
 */
export const updateOrderStatus = async (id, status) => {
  const response = await axiosInstance.patch(`/orders/${id}/status`, {status});
  return response.data;
};
