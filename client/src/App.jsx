import { useLocation, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { DarkModeProvider } from './context/DarkModeContext'; // Import the DarkMode context

// Define routes where Header and Footer shouldn't appear
const authRoutes = ['/login-page', '/signup-page', '/reset-master-password'];

function App() {
  const location = useLocation();
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    // Wrap the whole app in the DarkModeProvider so the entire app can access dark mode context
    <DarkModeProvider>
      <div className="min-h-screen transition-colors duration-300">
        {isAuthPage ? (
          // Render only the Outlet (auth pages) without Header and Footer
          <Outlet />
        ) : (
          <>
            <Header />
            <main className="flex-grow">
              <Outlet />
            </main>
            <Footer />
          </>
        )}
      </div>
    </DarkModeProvider>
  );
}

export default App;
