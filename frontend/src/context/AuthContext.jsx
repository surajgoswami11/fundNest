"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Add login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem(
      "fundnest-user",
      JSON.stringify({
        ...userData,
        role: userData.role,
      })
    );
  };

  // Add logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("fundnest-user");
  };

  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem("fundnest-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
