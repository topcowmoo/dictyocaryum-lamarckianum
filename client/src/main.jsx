import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Profile from './pages/Profile.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ChangePassword from './components/ChangePassword.jsx';
import Error from './pages/Error.jsx';
import ResetMasterPassword from './pages/ResetMasterPassword.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
         </ProtectedRoute>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'login-page',
        element: <LoginPage />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'signup-page',
        element: <SignupPage />,
      },
      {
        path: 'reset-master-password',
        element: <ResetMasterPassword />,
      },
      {
        path: 'change-password',
        element: <ChangePassword />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
