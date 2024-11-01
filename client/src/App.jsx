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
      <div className="h-screen flex flex-col overflow-hidden transition-colors duration-300">
        {isAuthPage ? (
          // Render only the Outlet (auth pages) without Header and Footer
          <Outlet />
        ) : (
          <>
            <Header className="h-[10vh]" />
            <main className="flex-grow h-full overflow-hidden">
              <Outlet />
            </main>
            <Footer className="h-[10vh]" />
          </>
        )}
      </div>
    </DarkModeProvider>
  );
}

export default App;
