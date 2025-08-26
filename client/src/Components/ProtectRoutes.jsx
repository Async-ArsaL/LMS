import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // check token
  if (!token) {
    // Agar login nahi hai, login page pe bhej do
    return (<Navigate to="/login" replace />);
    
  }
  return children;
};

export default ProtectedRoute;
