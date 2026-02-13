export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Food",
  "Furniture",
  "Tools",
  "Other",
];

export const ORDER_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
};

export const QUERY_KEYS = {
  PRODUCTS: "products",
  PRODUCT: "product",
  ORDERS: "orders",
  ORDER: "order",
  DASHBOARD_STATS: "dashboardStats",
  DASHBOARD_OVERVIEW: "dashboardOverview",
  CATEGORIES: "categories",
  PROFILE: "profile",
};
