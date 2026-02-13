import axiosInstance from "./axios";

/**
 * Download products CSV
 * @param {Object} filters - Optional filters
 */
export const downloadProductsCSV = async (filters = {}) => {
  const response = await axiosInstance.get("/export/products", {
    params: filters,
    responseType: "blob",
  });

  // Create download link
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `products-${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

/**
 * Download orders CSV
 * @param {Object} filters - Optional filters
 */
export const downloadOrdersCSV = async (filters = {}) => {
  const response = await axiosInstance.get("/export/orders", {
    params: filters,
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `orders-${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

/**
 * Download inventory report
 */
export const downloadInventoryReport = async () => {
  const response = await axiosInstance.get("/export/inventory-report", {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `inventory-report-${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};
