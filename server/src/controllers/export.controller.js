import Product from "../models/Product.model.js";
import Order from "../models/Order.model.js";
import {productsToCSV, ordersToCSV} from "../utils/csvExport.js";

/**
 * @route   GET /api/export/products
 * @desc    Export all products to CSV
 * @access  Private
 */
export const exportProducts = async (req, res, next) => {
  try {
    const {category, lowStock} = req.query;

    // Build filter
    const filter = {};
    if (category) filter.category = category;
    if (lowStock === "true") {
      filter.$expr = {$lte: ["$quantity", "$lowStockThreshold"]};
    }

    // Fetch products
    const products = await Product.find(filter)
      .select("-imageUrl -createdBy -__v")
      .sort({createdAt: -1})
      .lean();

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found to export",
      });
    }

    // Convert to CSV
    const csv = productsToCSV(products);

    // Set headers for file download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="products-${Date.now()}.csv"`,
    );

    res.send(csv);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/export/orders
 * @desc    Export all orders to CSV
 * @access  Private
 */
export const exportOrders = async (req, res, next) => {
  try {
    const {status} = req.query;

    const filter = {};
    if (status) filter.status = status;

    const orders = await Order.find(filter)
      .select(" -createdBy -__v")
      .sort({createdAt: -1})
      .lean();

    if (orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found to export",
      });
    }

    const csv = ordersToCSV(orders);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="orders-${Date.now()}.csv"`,
    );

    res.send(csv);
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/export/inventory-report
 * @desc    Export comprehensive inventory report
 * @access  Private
 */
export const exportInventoryReport = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("createdBy", "username")
      .sort({category: 1, name: 1})
      .lean();

    // Enhanced report with additional calculations
    const reportData = products.map((product) => ({
      sku: product.sku,
      name: product.name,
      category: product.category,
      price: product.price.toFixed(2),
      quantity: product.quantity,
      lowStockThreshold: product.lowStockThreshold,
      stockStatus:
        product.quantity <= product.lowStockThreshold
          ? "LOW STOCK"
          : product.quantity === 0
            ? "OUT OF STOCK"
            : "IN STOCK",
      stockValue: (product.price * product.quantity).toFixed(2),
      reorderSuggestion:
        product.quantity <= product.lowStockThreshold ? "YES" : "NO",
      addedBy: product.createdBy?.username || "N/A",
      dateAdded: new Date(product.createdAt).toLocaleDateString("en-US"),
    }));

    const fields = [
      {label: "SKU", value: "sku"},
      {label: "Product Name", value: "name"},
      {label: "Category", value: "category"},
      {label: "Unit Price", value: "price"},
      {label: "Stock Quantity", value: "quantity"},
      {label: "Low Stock Alert", value: "lowStockThreshold"},
      {label: "Status", value: "stockStatus"},
      {label: "Total Value", value: "stockValue"},
      {label: "Reorder Needed", value: "reorderSuggestion"},
      {label: "Added By", value: "addedBy"},
      {label: "Date Added", value: "dateAdded"},
    ];

    const {parse} = await import("json2csv");
    const csv = parse(reportData, {fields});

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="inventory-report-${Date.now()}.csv"`,
    );

    res.send(csv);
  } catch (error) {
    next(error);
  }
};
