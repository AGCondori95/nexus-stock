import {parse} from "json2csv";

/**
 * Convert products data to CSV format
 * @param {Array} products - Array of product objects
 * @returns {string} CSV string
 */
export const productsToCSV = (products) => {
  const fields = [
    {label: "SKU", value: "sku"},
    {label: "Product Name", value: "name"},
    {label: "Category", value: "category"},
    {label: "Price", value: "price"},
    {label: "Quantity", value: "quantity"},
    {label: "Low Stock Threshold", value: "lowStockThreshold"},
    {label: "Stock Status", value: "stockStatus"},
    {label: "Total Value", value: "totalValue"},
    {label: "Created At", value: "createdAt"},
  ];

  // Transform data for CSV
  const transformedData = products.map((product) => ({
    ...product,
    stockStatus:
      product.quantity <= product.lowStockThreshold ? "Low Stock" : "In Stock",
    totalValue: (product.price * product.quantity).toFixed(2),
    createdAt: new Date(product.createdAt).toLocaleDateString("en-US"),
  }));

  const csv = parse(transformedData, {fields});
  return csv;
};

/**
 * Convert orders data to CSV format
 * @param {Array} orders - Array of order objects
 * @returns {string} CSV string
 */
export const ordersToCSV = (orders) => {
  const fields = [
    {label: "Order Number", value: "orderNumber"},
    {label: "Customer Name", value: "customerName"},
    {label: "Customer Email", value: "customerEmail"},
    {label: "Total Amount", value: "totalAmount"},
    {label: "Status", value: "status"},
    {label: "Items Count", value: "itemsCount"},
    {label: "Created At", value: "createdAt"},
  ];

  const transformedData = orders.map((order) => ({
    ...order,
    itemsCount: order.items.length,
    totalAmount: order.totalAmount.toFixed(2),
    createdAt: new Date(order.createdAt).toLocaleDateString("en-US"),
  }));

  const csv = parse(transformedData, {fields});
  return csv;
};
