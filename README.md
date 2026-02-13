# 📦 NexusStock: Enterprise Resource Manager

![NexusStock Banner](https://img.shields.io/badge/NexusStock-ERM-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb)

**NexusStock** is a full-stack enterprise-grade inventory management system built with the MERN stack. It features advanced authentication, real-time analytics, cloud image storage, and comprehensive data export capabilities.

---

## 🌟 Features

### 🔐 Authentication & Security

- **JWT Dual Token System**: Access tokens (15min) + Refresh tokens (7 days)
- **httpOnly Cookies**: Secure refresh token storage
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Protection against brute-force attacks
- **CORS Configuration**: Secure cross-origin requests
- **Helmet.js**: Enhanced security headers

### 📦 Inventory Management

- **CRUD Operations**: Complete product lifecycle management
- **Image Upload**: Cloudinary integration with automatic optimization
- **Low Stock Alerts**: Configurable threshold warnings
- **Category Management**: Organized product classification
- **Advanced Filtering**: Search by name, SKU, category, stock status
- **Pagination**: Efficient data loading

### 🛒 Order Processing

- **MongoDB Transactions**: Atomic order creation with automatic rollback
- **Stock Deduction**: Automatic inventory updates
- **Order Tracking**: Complete order history and status management
- **Customer Management**: Email and contact information storage
- **Order Notes**: Custom instructions support

### 📊 Analytics Dashboard

- **Revenue Tracking**: Total and monthly revenue charts
- **Top Products**: Best-selling items analysis
- **Category Breakdown**: Inventory distribution by category
- **Low Stock Monitoring**: Real-time alerts for reorder
- **Interactive Charts**: Recharts-powered visualizations

### 📤 Data Export

- **CSV Export**: Products, orders, and comprehensive reports
- **Inventory Reports**: Detailed stock analysis with reorder suggestions
- **Filtered Exports**: Category and status-based filtering
- **Download Functionality**: Browser-native file downloads

### 📖 API Documentation

- **Swagger UI**: Interactive API documentation at `/api-docs`
- **Complete Schemas**: Request/response models
- **Authentication Examples**: Ready-to-use code snippets

---

## 🏗️ Tech Stack

### Backend

| Technology     | Purpose                       |
| -------------- | ----------------------------- |
| **Node.js**    | Runtime environment           |
| **Express.js** | Web application framework     |
| **MongoDB**    | NoSQL database                |
| **Mongoose**   | ODM for MongoDB               |
| **JWT**        | Authentication tokens         |
| **bcryptjs**   | Password hashing              |
| **Cloudinary** | Cloud image storage           |
| **Multer**     | File upload handling          |
| **Zod**        | Schema validation             |
| **Helmet**     | Security middleware           |
| **Morgan**     | HTTP request logger           |
| **CORS**       | Cross-origin resource sharing |
| **json2csv**   | CSV export functionality      |
| **Swagger**    | API documentation             |

### Frontend

| Technology          | Purpose                 |
| ------------------- | ----------------------- |
| **React 18**        | UI library              |
| **Vite**            | Build tool              |
| **Tailwind CSS**    | Utility-first CSS       |
| **shadcn/ui**       | Component library       |
| **TanStack Query**  | Server state management |
| **React Router**    | Client-side routing     |
| **React Hook Form** | Form management         |
| **Zod**             | Client-side validation  |
| **Axios**           | HTTP client             |
| **Recharts**        | Data visualization      |
| **Lucide React**    | Icon library            |
| **date-fns**        | Date utilities          |

---

## 📁 Project Structure

```
nexus-stock/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── cloudinary.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── product.controller.js
│   │   │   ├── order.controller.js
│   │   │   ├── dashboard.controller.js
│   │   │   └── export.controller.js
│   │   ├── middlewares/
│   │   │   ├── errorHandler.js
│   │   │   ├── validateSchema.js
│   │   │   ├── verifyToken.js
│   │   │   ├── upload.js
│   │   │   └── rateLimiter.js
│   │   ├── models/
│   │   │   ├── User.model.js
│   │   │   ├── Product.model.js
│   │   │   └── Order.model.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── product.routes.js
│   │   │   ├── order.routes.js
│   │   │   ├── dashboard.routes.js
│   │   │   └── export.routes.js
│   │   ├── schemas/
│   │   │   ├── auth.schema.js
│   │   │   ├── product.schema.js
│   │   │   └── order.schema.js
│   │   ├── utils/
│   │   │   ├── jwt.js
│   │   │   └── csvExport.js
│   │   ├── app.js
│   │   └── swagger.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── clients/
    ├── src/
    │   ├── api/
    │   │   ├── axios.js
    │   │   ├── authApi.js
    │   │   ├── productApi.js
    │   │   ├── orderApi.js
    │   │   ├── dashboardApi.js
    │   │   └── exportApi.js
    │   ├── components/
    │   │   ├── ui/
    │   │   ├── layout/
    │   │   ├── auth/
    │   │   ├── products/
    │   │   ├── orders/
    │   │   └── dashboard/
    │   ├── contexts/
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   ├── useProducts.js
    │   │   ├── useOrders.js
    │   │   └── useDashboard.js
    │   ├── lib/
    │   │   └── utils.js
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Products.jsx
    │   │   ├── Orders.jsx
    │   │   └── CreateOrder.jsx
    │   ├── routes/
    │   │   ├── ProtectedRoute.jsx
    │   │   └── AppRoutes.jsx
    │   ├── schemas/
    │   │   ├── authSchema.js
    │   │   ├── productSchema.js
    │   │   └── orderSchema.js
    │   ├── utils/
    │   │   ├── constants.js
    │   │   └── formatters.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **MongoDB** >= 6.x (local or Atlas)
- **npm** or **yarn**
- **Cloudinary Account** (free tier available)

### Installation

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AGCondori95/nexus-stock.git
cd nexus-stock
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Configure `.env`:**

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/nexusstock
# or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/nexusstock

# JWT Secrets (CHANGE IN PRODUCTION!)
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_chars
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# CORS
CLIENT_URL=http://localhost:5173

# Cloudinary (Get from https://cloudinary.com)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Start Backend:**

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Backend will run on **http://localhost:5000**

#### 3️⃣ Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Configure `.env`:**

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Start Frontend:**

```bash
npm run dev
```

Frontend will run on **http://localhost:5173**

---

## 📚 API Documentation

Once the backend is running, access the interactive API documentation:

🔗 **http://localhost:5000/api-docs**

### Main Endpoints

#### Authentication

```
POST   /api/auth/register       # Register new user
POST   /api/auth/login          # Login user
POST   /api/auth/refresh        # Refresh access token
POST   /api/auth/logout         # Logout user
GET    /api/auth/profile        # Get user profile
```

#### Products

```
GET    /api/products            # Get all products (with filters)
GET    /api/products/:id        # Get single product
POST   /api/products            # Create product (with image)
PUT    /api/products/:id        # Update product
DELETE /api/products/:id        # Delete product
GET    /api/products/categories/list  # Get categories
```

#### Orders

```
GET    /api/orders              # Get all orders
GET    /api/orders/:id          # Get single order
POST   /api/orders              # Create order (auto stock deduction)
PATCH  /api/orders/:id/status   # Update order status
```

#### Dashboard

```
GET    /api/dashboard/stats     # Get analytics data
GET    /api/dashboard/overview  # Get overview metrics
```

#### Export

```
GET    /api/export/products           # Export products CSV
GET    /api/export/orders             # Export orders CSV
GET    /api/export/inventory-report   # Export full inventory report
```

---

## 🧪 Testing the Application

### 1. Register a User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }' \
  -c cookies.txt
```

### 3. Create Product (with image)

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "name=Laptop Dell XPS 15" \
  -F "sku=LAPTOP-XPS15" \
  -F "category=Electronics" \
  -F "price=1299.99" \
  -F "quantity=50" \
  -F "lowStockThreshold=5" \
  -F "image=@/path/to/image.jpg"
```

### 4. Create Order

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "productId": "PRODUCT_ID_HERE",
        "quantity": 2
      }
    ],
    "customerName": "Jane Doe",
    "customerEmail": "jane@example.com",
    "notes": "Express delivery"
  }'
```

### 5. Get Dashboard Stats

```bash
curl http://localhost:5000/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🎨 Frontend Features

### Pages

- **Login/Register**: Secure authentication with validation
- **Dashboard**: Real-time analytics with charts
- **Products**: CRUD operations with image upload
- **Orders**: Order management and creation
- **Create Order**: Multi-item order form with stock validation

### Key Components

- **Navbar**: User info and logout
- **Sidebar**: Navigation menu
- **StatCard**: Dashboard metrics display
- **RevenueChart**: Area chart for monthly revenue
- **TopProductsChart**: Bar chart for best sellers
- **ProductCard**: Product display with actions
- **ProductForm**: Create/edit products with validation
- **OrderForm**: Multi-item order creation

---

## 🔒 Security Features

### Backend Security

- ✅ JWT tokens with short expiration
- ✅ Refresh token rotation
- ✅ httpOnly cookies (XSS protection)
- ✅ Password hashing with bcrypt
- ✅ Rate limiting per endpoint
- ✅ Helmet.js security headers
- ✅ CORS configuration
- ✅ Input validation with Zod
- ✅ MongoDB injection prevention

### Frontend Security

- ✅ Automatic token refresh
- ✅ Protected routes
- ✅ Client-side validation
- ✅ Secure credential storage
- ✅ XSS protection

---

## 📊 Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  username: String (unique, 3-30 chars),
  email: String (unique, lowercase),
  password: String (hashed),
  role: String (enum: ['admin', 'user']),
  refreshToken: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  sku: String (unique, uppercase),
  category: String (enum),
  price: Number (min: 0),
  quantity: Number (min: 0),
  lowStockThreshold: Number (default: 10),
  imageUrl: String (Cloudinary URL),
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Order Collection

```javascript
{
  _id: ObjectId,
  orderNumber: String (auto-generated),
  items: [{
    product: ObjectId (ref: Product),
    productName: String,
    sku: String,
    quantity: Number,
    priceAtPurchase: Number,
    subtotal: Number
  }],
  totalAmount: Number,
  status: String (enum: ['pending', 'completed', 'cancelled']),
  customerName: String,
  customerEmail: String,
  notes: String,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. **Set Environment Variables** in your hosting platform
2. **Update CORS**: Set `CLIENT_URL` to your frontend URL
3. **MongoDB Atlas**: Use cloud database URI
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`

### Frontend Deployment (Vercel/Netlify)

1. **Set Environment Variable**: `VITE_API_BASE_URL=https://your-backend-url.com/api`
2. **Build Command**: `npm run build`
3. **Output Directory**: `dist`
4. **Node Version**: 18+

---

## 📈 Performance Optimizations

- ✅ **TanStack Query**: Caching and background refetching
- ✅ **Pagination**: Efficient data loading
- ✅ **Image Optimization**: Cloudinary automatic compression
- ✅ **MongoDB Indexing**: Fast queries on SKU, category
- ✅ **Rate Limiting**: Prevent abuse
- ✅ **Lazy Loading**: React route-based code splitting

---

## 🛠️ Future Enhancements

- [ ] Role-based permissions (Admin/User/Manager)
- [ ] Real-time notifications (Socket.io)
- [ ] Advanced reporting (PDF generation)
- [ ] Multi-warehouse support
- [ ] Barcode scanning integration
- [ ] Email notifications (SendGrid/Nodemailer)
- [ ] Audit logs
- [ ] Dark mode support
- [ ] Mobile responsive improvements
- [ ] Unit and integration tests

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Álvaro Condorí**

- GitHub: [@AGCondori95](https://github.com/AGCondori95)
- LinkedIn: [Alvaro Condorí](https://linkedin.com/in/condorialvaro)
- Email: condorialvaro95@gmail.com

---

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query)
- [Cloudinary](https://cloudinary.com/)
- [Recharts](https://recharts.org/)

---

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Email: support@nexusstock.com
- Join our Discord community

---

<div align="center">
  <p>Made with ❤️ and ☕</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>

---

**Happy Coding! 🚀**
