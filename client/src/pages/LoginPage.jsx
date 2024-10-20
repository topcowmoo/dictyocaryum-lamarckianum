import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { PiSealCheckDuotone, PiEyeDuotone, PiEyeClosedDuotone } from 'react-icons/pi';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Track visibility of password
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message || 'Invalid username or password');
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 flex flex-col justify-start items-center bg-hefo-light dark:bg-hefo-dark p-12">
        <div className="sm:w-full sm:max-w-sm">
          <img
            src="https://vaultguardbucket2024.s3.amazonaws.com/logo.svg"
            alt="App logo"
            className="mx-auto h-40 w-auto"
          />
          <h1 className="mt-10 text-center text-2xl font-bold tracking-tight leading-9 dark:text-title-dark text-title-light">
            VaultGuard Password Locker
          </h1>
          <h2 className="mt-2 text-center text-lg font-medium dark:text-alltext-dark text-alltext-light">
            Login to your account
          </h2>
        </div>

        <div className="mt-10 sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 dark:text-title-dark text-title-light">
                Email
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm placeholder:text-gray-400 sm:text-sm"
              />
            </div>

            {/* Password Input with Show/Hide Toggle */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 dark:text-title-dark text-title-light">
                Master Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'} // Toggle between text and password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm placeholder:text-gray-400 sm:text-sm"
                />
                {/* Toggle Icon */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <PiEyeClosedDuotone size={20} />
                  ) : (
                    <PiEyeDuotone size={20} />
                  )}
                </button>
              </div>
              <Link
                to="/reset-master-password"
                className="text-sm font-semibold dark:text-title-dark text-title-light hover:text-highlight-light dark:hover:text-highlight-dark"
              >
                Forgot password?
              </Link>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              icon={PiSealCheckDuotone}
              label="Login"
              className="dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light dark:hover:bg-highlight-dark hover:bg-highlight-light"
            />
          </form>

          <p className="mt-10 text-center text-sm dark:text-alltext-dark text-alltext-light">
            Don&apos;t have an account?{' '}
            <a href="/signup-page" className="underline dark:text-highlight-dark text-highlight-light">
              Sign up here
            </a>
          </p>
        </div>
      </div>

      {/* Right Section with Image */}
      <div className="w-1/2">
        <img
          src="https://vaultguardbucket2024.s3.amazonaws.com/pexels-ozge-taskiran-85164141-12651886.webp"
          alt="Login illustration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default LoginPage;
