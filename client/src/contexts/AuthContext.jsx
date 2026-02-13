import {createContext, useEffect, useState} from "react";
import {
  login as loginApi,
  logout as logoutApi,
  register as registerApi,
} from "../api/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("accessToken");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  /**
   * Login user
   */
  const login = async (credentials) => {
    try {
      const response = await loginApi(credentials);
      setUser(response.data.user);
      return response;
    } catch (error) {
      console.error(
        "Error en el login:",
        error.response?.data || error.message,
      );
      throw error;
    }
  };

  /**
   * Register user
   */
  const register = async (userData) => {
    try {
      const response = await registerApi(userData);
      return response;
    } catch (error) {
      console.log(
        "Error en la registración:",
        error.response?.data || error.message,
      );
      throw error;
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
    } catch (error) {
      // Even if logout fails, clear local data
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    }
  };

  /**
   * Update user data
   */
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
