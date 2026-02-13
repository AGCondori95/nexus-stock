import Order from "../models/Order.model.js";
import Product from "../models/Product.model.js";

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get dashboard statistics and analytics
 * @access  Private
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    // Parallel execution of multiple aggregations
    const [
      totalRevenue,
      categoryBreakdown,
      lowStockProducts,
      recentOrders,
      topSellingProducts,
      monthlyRevenue,
    ] = await Promise.all([
      // 1. Total Revenue
      Order.aggregate([
        {$match: {status: "completed"}},
        {$group: {_id: null, total: {$sum: "$totalAmount"}}},
      ]),

      // 2. Category Breakdown
      Product.aggregate([
        {
          $group: {
            _id: "$category",
            count: {$sum: 1},
            totalValue: {$sum: {$multiply: ["$price", "$quantity"]}},
          },
        },
        {
          $project: {
            category: "$_id",
            count: 1,
            totalValue: 1,
            _id: 0,
          },
        },
        {$sort: {count: -1}},
      ]),

      // 3. Low Stock Products
      Product.aggregate([
        {$match: {$expr: {$lte: ["$quantity", "$lowStockThreshold"]}}},
        {
          $project: {
            name: 1,
            sku: 1,
            quantity: 1,
            lowStockThreshold: 1,
            category: 1,
          },
        },
        {$sort: {quantity: 1}},
        {$limit: 10},
      ]),

      // 4. Recent Orders (last 5)
      Order.find()
        .populate("createdBy", "username")
        .sort({createdAt: -1})
        .limit(5)
        .select("orderNumber customerName totalAmount status createdAt"),

      // 5. Top Selling Products
      Order.aggregate([
        {$match: {status: "completed"}},
        {$unwind: "$items"},
        {
          $group: {
            _id: "$items.product",
            productName: {$first: "$items.productName"},
            totalQuantitySold: {$sum: "$items.quantity"},
            totalRevenue: {$sum: "$items.subtotal"},
          },
        },
        {$sort: {totalQuantitySold: -1}},
        {$limit: 10},
        {
          $project: {
            productId: "$_id",
            productName: 1,
            totalQuantitySold: 1,
            totalRevenue: 1,
            _id: 0,
          },
        },
      ]),

      // 6. Monthly Revenue (last 6 months)
      Order.aggregate([
        {
          $match: {
            status: "completed",
            createdAt: {
              $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)),
            },
          },
        },
        {
          $group: {
            _id: {
              year: {$year: "$createdAt"},
              month: {$month: "$createdAt"},
            },
            revenue: {$sum: "$totalAmount"},
            orderCount: {$sum: 1},
          },
        },
        {$sort: {"_id.year": 1, "_id.month": 1}},
        {
          $project: {
            month: {
              $concat: [
                {$toString: "$_id.year"},
                "-",
                {
                  $cond: {
                    if: {$lt: ["$_id.month", 10]},
                    then: {$concat: ["0", {$toString: "$_id.month"}]},
                    else: {$toString: "$_id.month"},
                  },
                },
              ],
            },
            revenue: 1,
            orderCount: 1,
            _id: 0,
          },
        },
      ]),
    ]);

    // Format response
    res.json({
      success: true,
      data: {
        totalRevenue: totalRevenue[0]?.total || 0,
        categoryBreakdown,
        lowStockProducts,
        recentOrders,
        topSellingProducts,
        monthlyRevenue,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/dashboard/overview
 * @desc    Get quick overview metrics
 * @access  Private
 */
export const getOverview = async (req, res, next) => {
  try {
    const [totalProducts, totalOrders, lowStockCount, todayRevenue] =
      await Promise.all([
        Product.countDocuments(),

        Order.countDocuments({status: "completed"}),

        Product.countDocuments({
          $expr: {$lte: ["$quantity", "$lowStockThreshold"]},
        }),

        Order.aggregate([
          {
            $match: {
              status: "completed",
              createdAt: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
              },
            },
          },
          {$group: {_id: null, total: {$sum: "$totalAmount"}}},
        ]),
      ]);

    res.json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        lowStockCount,
        todayRevenue: todayRevenue[0]?.total || 0,
      },
    });
  } catch (error) {
    next(error);
  }
};
