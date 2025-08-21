// "use client";

// import React, { createContext, useState, useContext, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // Add login function
//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem(
//       "fundnest-user",
//       JSON.stringify({
//         ...userData,
//         role: userData.role,
//       })
//     );
//   };

//   // Add logout function
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("fundnest-user");
//   };

//   // Check for existing session on load
//   useEffect(() => {
//     const savedUser = localStorage.getItem("fundnest-user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }



"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Add login function
  const login = (userData) => {
    console.log("Login called with:", userData); // Debug log
    setUser(userData);
    
    // Store user data in localStorage
    localStorage.setItem("fundnest-user", JSON.stringify(userData));
    
    // Store token separately if available
    if (userData.token) {
      localStorage.setItem("fundnest-token", userData.token);
    }
  };

  // Add logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("fundnest-user");
    localStorage.removeItem("fundnest-token");
    
    // Redirect to login page
    window.location.href = "/login";
  };

  // Check for existing session on load
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem("fundnest-user");
        const savedToken = localStorage.getItem("fundnest-token");
        
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          
          // Ensure user has a role, default to 'user'
          if (!userData.role) {
            userData.role = 'user';
          }
          
          // Add token back if it exists separately
          if (savedToken && !userData.token) {
            userData.token = savedToken;
          }
          
          console.log("Restored user from localStorage:", userData); // Debug log
          setUser(userData);
        }
      } catch (error) {
        console.error("Error loading user from localStorage:", error);
        // Clear corrupted data
        localStorage.removeItem("fundnest-user");
        localStorage.removeItem("fundnest-token");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Update user data (for profile updates, etc.)
  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem("fundnest-user", JSON.stringify(updatedUser));
  };

  // Check if user has specific role
  const hasRole = (requiredRole) => {
    if (!user) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  };

  // Get user's display name
  const getUserDisplayName = () => {
    if (!user) return "User";
    return user.name || user.userName || user.email || "User";
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}