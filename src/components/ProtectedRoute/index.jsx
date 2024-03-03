import React from "react";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");
  if (token) {
    return children;
  }
  return <Navigate to="/login" />;
}
export default ProtectedRoute;
