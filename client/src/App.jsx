import { useLocation, Outlet } from 'react-router-dom';
import Header from './components/Header';
import { DarkModeProvider } from './context/DarkModeContext';

// Define routes where Header shouldn't appear
const authRoutes = ['/login-page', '/signup-page', '/reset-master-password'];

function App() {
  const location = useLocation();
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <DarkModeProvider>
      <div className="h-screen flex flex-col transition-colors duration-300">
        {isAuthPage ? (
          // Render only the Outlet (auth pages) without Header
          <Outlet />
        ) : (
          <>
            <Header className="h-[10vh]" />
            <main className="flex-grow overflow-y-auto">
              <Outlet />
            </main>
          </>
        )}
      </div>
    </DarkModeProvider>
  );
}

export default App;
