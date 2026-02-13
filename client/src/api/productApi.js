import axiosInstance from "./axios";

/**
 * Get all products with filters
 * @param {Object} params - Query parameters
 * @returns {Promise} API response
 */
export const getProducts = async (params = {}) => {
  const response = await axiosInstance.get("/products", {params});
  return response.data;
};

/**
 * Get single product by ID
 * @param {string} id - Product ID
 * @returns {Promise} API response
 */
export const getProductById = async (id) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

/**
 * Create new product
 * @param {FormData} formData - Product data with optional image
 * @returns {Promise} API response
 */
export const createProduct = async (formData) => {
  const response = await axiosInstance.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/**
 * Update product
 * @param {string} id - Product ID
 * @param {FormData} formData - Updated product data
 * @returns {Promise} API response
 */
export const updateProduct = async (id, formData) => {
  const response = await axiosInstance.put(`/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/**
 * Delete product
 * @param {string} id - Product ID
 * @returns {Promise} API response
 */
export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};

/**
 * Get all categories
 * @returns {Promise} API response
 */
export const getCategories = async () => {
  const response = await axiosInstance.get("/products/categories/list");
  return response.data;
};
