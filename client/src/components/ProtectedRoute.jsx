// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import propTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  // Check if the user is authenticated (either localStorage or sessionStorage)
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login-page" replace />;
  }

  // If token exists, render the protected content
  return children;
};

ProtectedRoute.propTypes = {
  children: propTypes.node.isRequired,
};

export default ProtectedRoute;
