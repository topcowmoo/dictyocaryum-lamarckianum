import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user/auth/verify`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.user); // Store user object with email
        } else {
          setUser(null); // Clear user state if not authenticated
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null); // Ensure user is set to null on error
      }
    };

    checkAuthStatus();
  }, []);

  // Logout function
  const logout = async (navigate) => {
    try {
      // Call the backend to clear the auth token
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        setUser(null); // Clear the user state
        navigate("/login-page", { replace: true }); // Redirect to login page
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
