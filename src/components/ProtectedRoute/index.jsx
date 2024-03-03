import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute Function
 *
 * Description: This function defines a React component for protecting routes based on authentication.
 * It checks for the presence of an authentication token in the local storage.
 * If the token exists, it renders the children components, allowing access to the protected route.
 * If the token doesn't exist, it redirects the user to the login page using the Navigate component from React Router.
 *
 * @param {Object} props - Props passed to the ProtectedRoute component.
 * @param {ReactNode} props.children - The children components to be rendered within the protected route.
 *
 * @returns {ReactNode} Returns the children components if authenticated, otherwise redirects to the login page.
 *
 **/
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");
  if (token) {
    return children;
  }
  return <Navigate to="/login" />;
}

export default ProtectedRoute;
