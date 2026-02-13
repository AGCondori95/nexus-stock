import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import exportRoutes from "./routes/export.routes.js";
import {errorHandler, notFound} from "./middlewares/errorHandler.js";
import {generalLimiter, authLimiter} from "./middlewares/rateLimiter.js";

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Logging middleware (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate limiting
app.use("/api/", generalLimiter);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

if (process.env.NODE_ENV === "development") {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      customCss: ".swagger-ui .topbar { display: none }",
      customSiteTitle: "NexusStock API Docs",
    }),
  );

  // Swagger JSON endpoint
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
}

// API routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/export", exportRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
