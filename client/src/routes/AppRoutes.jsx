import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../pages/Login";
import {Register} from "../pages/Register";
import {ProtectedRoute} from "./ProtectedRoute";
import {Layout} from "../components/layout/Layout";
import {Dashboard} from "../pages/Dashboard";
import {Products} from "../pages/Products";
import {Orders} from "../pages/Orders";
import {CreateOrder} from "../pages/CreateOrder";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      {/* Protected routes */}
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
        <Route index element={<Navigate to='/dashboard' replace />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='products' element={<Products />} />
        <Route path='orders' element={<Orders />} />
        <Route path='orders/create' element={<CreateOrder />} />
      </Route>

      {/* 404 */}
      <Route path='*' element={<Navigate to='/' replace />} />
    </Routes>
  );
};
