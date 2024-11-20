import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../context/AuthContext"; // Ensure AuthContext is imported

const apiURL = import.meta.env.VITE_API_URL;

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { setUser } = useContext(AuthContext); // AuthContext for managing user state

  // Check authentication status on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${apiURL}/api/user/auth/verify`, {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUser(data.user); // Update user context with the authenticated user
        } else {
          setIsAuthenticated(false);
          setUser(null); // Clear user context
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuthStatus();
  }, [setUser]);

  // Render loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Replace with a spinner or skeleton loader if desired
  }

  // Navigate to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login-page" replace />;
  }

  // Render the protected children if authenticated
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
