import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "NexusStock API",
    version: "1.0.0",
    description: "Enterprise Resource Manager - Inventory Management System",
    contact: {
      name: "API Support",
      email: "support@nexusstock.com",
    },
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Development server",
    },
    {
      url: "https://api.nexusstock.com",
      description: "Production server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      User: {
        type: "object",
        properties: {
          _id: {type: "string", example: "507f1f77bcf86cd799439011"},
          username: {type: "string", example: "john_doe"},
          email: {type: "string", example: "john@example.com"},
          role: {type: "string", enum: ["admin", "user"], example: "user"},
          createdAt: {type: "string", format: "date-time"},
          updatedAt: {type: "string", format: "date-time"},
        },
      },
      Product: {
        type: "object",
        required: [
          "name",
          "sku",
          "category",
          "price",
          "quantity",
          "lowStockThreshold",
        ],
        properties: {
          _id: {type: "string"},
          name: {type: "string", example: "Laptop Dell XPS 15"},
          sku: {type: "string", example: "LAPTOP-XPS15"},
          category: {
            type: "string",
            enum: [
              "Electronics",
              "Clothing",
              "Food",
              "Furniture",
              "Tools",
              "Other",
            ],
            example: "Electronics",
          },
          price: {type: "number", example: 1299.99},
          quantity: {type: "integer", example: 50},
          lowStockThreshold: {type: "integer", example: 10},
          imageUrl: {type: "string", nullable: true},
          isLowStock: {type: "boolean", example: false},
          createdBy: {type: "string"},
          createdAt: {type: "string", format: "date-time"},
          updatedAt: {type: "string", format: "date-time"},
        },
      },
      Order: {
        type: "object",
        properties: {
          _id: {type: "string"},
          orderNumber: {type: "string", example: "ORD-20260212-0001"},
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                product: {type: "string"},
                productName: {type: "string"},
                sku: {type: "string"},
                quantity: {type: "integer"},
                priceAtPurchase: {type: "number"},
                subtotal: {type: "number"},
              },
            },
          },
          totalAmount: {type: "number", example: 2599.98},
          status: {type: "string", enum: ["pending", "completed", "cancelled"]},
          customerName: {type: "string", example: "Jane Doe"},
          customerEmail: {type: "string", example: "jane@example.com"},
          notes: {type: "string", nullable: true},
          createdBy: {type: "string"},
          createdAt: {type: "string", format: "date-time"},
        },
      },
      Error: {
        type: "object",
        properties: {
          success: {type: "boolean", example: false},
          message: {type: "string", example: "Error message"},
          errors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                field: {type: "string"},
                message: {type: "string"},
              },
            },
          },
        },
      },
    },
  },
  tags: [
    {name: "Auth", description: "Authentication endpoints"},
    {name: "Products", description: "Product management"},
    {name: "Orders", description: "Order management"},
    {name: "Dashboard", description: "Analytics and statistics"},
    {name: "Export", description: "Data export endpoints"},
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // Path to API routes for annotations
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
