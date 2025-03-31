// Importing necessary hooks and components from React and React Router
import { useState } from 'react'; // useState hook for managing state
import { useLocation, Outlet } from 'react-router-dom'; // useLocation to get the current route and Outlet for rendering child routes
import Header from './components/Header'; // Header component
import Footer from './components/Footer'; // Footer component
import { DarkModeProvider } from './context/DarkModeContext'; // Dark mode context provider
import { AuthProvider } from './context/AuthContext'; // Auth context provider

// Array of routes that do not display the Header and Footer
const authRoutes = ['/login-page', '/signup-page', '/reset-master-password', '/profile'];

function App() {
  const location = useLocation();
  const isAuthPage = authRoutes.includes(location.pathname);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AuthProvider>
      <DarkModeProvider>
        <div className="h-screen flex flex-col overflow-hidden transition-colors duration-300">
          {isAuthPage ? (
            <Outlet />
          ) : (
            <>
              <Header setSearchQuery={setSearchQuery} />
              <main className="flex-grow overflow-hidden">
                <div className="h-full">
                  <Outlet context={{ searchQuery }} />
                </div>
              </main>
              <Footer />
            </>
          )}
        </div>
      </DarkModeProvider>
    </AuthProvider>
  );
}


export default App; // Exporting the App component as the default export
