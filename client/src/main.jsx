import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

import Home from './pages/Home.jsx';
import AddPassword from './pages/AddPassword.jsx';
import EditPassword from './pages/EditPassword.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Profile from './pages/Profile.jsx';
import SignupPage from './pages/SignupPage.jsx';
import Error from './pages/Error.jsx';
import Vault from './pages/Vault.jsx';
import ResetMasterPassword from './pages/ResetMasterPassword.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'add-password',
        element: <AddPassword />,
      },
      {
        path: 'edit-password/:id',
        element: <EditPassword />,
      },
      {
        path: 'login-page',
        element: <LoginPage />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'signup-page',
        element: <SignupPage />,
      },
      {
        path: 'vault',
        element: <Vault />,
      },
      {
        path: 'reset-master-password',
        element: <ResetMasterPassword />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
