"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api/config";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const token = Cookies.get("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Token is invalid or expired", error);
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(checkUserLoggedIn, 100);
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setUser(null);
    window.location.href = "/";
  };

  const value = { user, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
