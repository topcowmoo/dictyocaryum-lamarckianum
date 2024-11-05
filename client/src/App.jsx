import { useLocation, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { DarkModeProvider } from './context/DarkModeContext';

// Define routes where Header shouldn't appear
const authRoutes = ['/login-page', '/signup-page', '/reset-master-password', '/profile'];

function App() {
  const location = useLocation();
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <DarkModeProvider>
      <div className="h-screen flex flex-col transition-colors duration-300">
        {isAuthPage ? (
          <Outlet />
        ) : (
          <>
            <Header className="h-[10vh]" />
            <main className="h-[80vh] overflow-hidden">
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
