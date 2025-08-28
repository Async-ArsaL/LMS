// context.jsx
import React, { createContext, useState, useEffect } from "react";

// 1️⃣ Context create karo
export const UserContext = createContext();

// 2️⃣ Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // user info (name, email, role)
  const [token, setToken] = useState(null); // JWT token
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Agar page reload ho jaye, localStorage se restore karo
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      setIsLoggedIn(true);
    }
  }, []);

  // Login function
  const loginUser = (userData, token) => {
    setUser(userData);
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // Logout function
  const logoutUser = () => {
    setUser(null);
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{ user, token, isLoggedIn, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
