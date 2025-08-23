"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { postWithToken } from "../helper/common";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData);

    localStorage.setItem("fundnest-user", JSON.stringify(userData));

    if (userData.token) {
      localStorage.setItem("fundnest-token", userData.token);
    }
  };

  const logout = async () => {
    await postWithToken("api/auth/logout")
    setUser(null);
    localStorage.removeItem("fundnest-user");
    localStorage.removeItem("fundnest-token");

    window.location.href = "/login";
  };

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem("fundnest-user");
        const savedToken = localStorage.getItem("fundnest-token");

        if (savedUser) {
          const userData = JSON.parse(savedUser);

          if (!userData.role) {
            userData.role = "user";
          }

          if (savedToken && !userData.token) {
            userData.token = savedToken;
          }

          setUser(userData);
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        localStorage.removeItem("fundnest-user");
        localStorage.removeItem("fundnest-token");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem("fundnest-user", JSON.stringify(updatedUser));
  };

  const hasRole = (requiredRole) => {
    if (!user) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  };

  const getUserDisplayName = () => {
    if (!user) return "User";
    return user.userName || user.email || "User" || "admin";
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    hasRole,
    getUserDisplayName,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
