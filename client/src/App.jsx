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
  const location = useLocation(); // Gets the current location object
  const isAuthPage = authRoutes.includes(location.pathname); // Checks if the current route is one of the auth routes

  const [searchQuery, setSearchQuery] = useState(""); // State to manage the search query

  return (
    <AuthProvider>
    <DarkModeProvider> {/* Providing the dark mode context to the entire app */}
      <div className="h-screen flex flex-col transition-colors duration-300"> {/* Main container with full height, flex layout, and smooth color transition */}
        {isAuthPage ? (
          <Outlet /> // If the current route is an auth route, render only the Outlet (child routes)
        ) : (
          <>
            <Header className="h-[10vh]" setSearchQuery={setSearchQuery} /> {/* Header component, passing setSearchQuery as a prop */}
            <main className="flex-grow overflow-hidden"> {/* Main content area that grows to fill available space and hides overflow */}
              <Outlet context={{ searchQuery }} /> {/* Outlet for rendering child routes, providing the searchQuery as context */}
            </main>
            <Footer className="h-[10vh]" /> {/* Footer component with fixed height */}
          </>
        )}
      </div>
    </DarkModeProvider>
    </AuthProvider>
  );
}

export default App; // Exporting the App component as the default export
