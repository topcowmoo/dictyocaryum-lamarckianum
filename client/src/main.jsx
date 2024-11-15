// Importing necessary libraries and components for the React application

import ReactDOM from 'react-dom/client'; // Importing ReactDOM to render the app
import { createBrowserRouter, RouterProvider } from 'react-router-dom'; // Importing routing functions from react-router-dom for navigation
import './index.css'; // Importing global CSS styles
import App from './App.jsx'; // Main App component
import ProtectedRoute from './components/ProtectedRoute.jsx'; // Component to protect routes, allowing only authenticated users
import Dashboard from './pages/Dashboard.jsx'; // Dashboard page, protected by authentication
import LoginPage from './pages/LoginPage.jsx'; // Login page component
import Profile from './pages/Profile.jsx'; // Profile page, protected by authentication
import SignupPage from './pages/SignupPage.jsx'; // Signup page component
import ChangePassword from './components/ChangePassword.jsx'; // Component for changing password
import Error from './pages/Error.jsx'; // Error page component, displayed for invalid routes
import ResetMasterPassword from './pages/ResetMasterPassword.jsx'; // Page for resetting master password
import { DarkModeProvider } from './context/DarkModeContext.jsx'; // Context provider for managing dark mode

// Setting up the routing configuration using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/', // Root path
    element: <App />, // Main App component
    errorElement: <Error />, // Error component for handling 404 or other errors
    children: [
      {
        index: true, // Default route when accessing '/'
        element: (
          <ProtectedRoute> 
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard', // Path to access the Dashboard
        element: (
          <ProtectedRoute> 
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'login-page', // Path to access the login page
        element: <LoginPage />, // LoginPage component
      },
      {
        path: 'profile', // Path to access the profile page
        element: (
          <ProtectedRoute>
            <Profile /> 
          </ProtectedRoute>
        ),
      },
      {
        path: 'signup-page', // Path to access the signup page
        element: <SignupPage />, // SignupPage component
      },
      {
        path: 'reset-master-password', // Path to reset the master password
        element: <ResetMasterPassword />, // ResetMasterPassword component
      },
      {
        path: 'change-password', // Path to change the password
        element: <ChangePassword />, // ChangePassword component
      },
    ],
  },
]);

// Rendering the app using ReactDOM and wrapping it in the DarkModeProvider for dark mode functionality
ReactDOM.createRoot(document.getElementById('root')).render(
  <DarkModeProvider>
    <RouterProvider router={router} />
  </DarkModeProvider>
);
