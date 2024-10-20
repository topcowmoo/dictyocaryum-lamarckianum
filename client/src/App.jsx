import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthLayout from './components/AuthLayout';

// Define routes where Header and Footer shouldn't appear
const authRoutes = ['/login-page', '/signup-page', '/reset-master-password'];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'light' ? false : true;
  });

  const location = useLocation();
  const isAuthPage = authRoutes.includes(location.pathname);

  // Apply dark or light mode based on the isDarkMode state
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Toggle dark mode and save preference in localStorage
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      {isAuthPage ? (
        // Render AuthLayout for auth pages
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      ) : (
        // Render Header, Footer, and Outlet for non-auth pages
        <>
          <Header />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer
            toggleDarkMode={toggleDarkMode}
            isDarkMode={isDarkMode}
          />
        </>
      )}
    </div>
  );
}

export default App;
