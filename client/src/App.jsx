import { useState } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { DarkModeProvider } from './context/DarkModeContext';

const authRoutes = ['/login-page', '/signup-page', '/reset-master-password', '/profile'];

function App() {
  const location = useLocation();
  const isAuthPage = authRoutes.includes(location.pathname);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DarkModeProvider>
      <div className="h-screen flex flex-col transition-colors duration-300">
        {isAuthPage ? (
          <Outlet />
        ) : (
          <>
            <Header className="h-[10vh]" setSearchQuery={setSearchQuery} />
            <main className="flex-grow overflow-hidden">
              <Outlet context={{ searchQuery }} />
            </main>
            <Footer className="h-[10vh]" />
          </>
        )}
      </div>
    </DarkModeProvider>
  );
}

export default App;
