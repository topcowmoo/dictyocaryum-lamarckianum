import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { PiSealCheckDuotone } from 'react-icons/pi';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message || 'Error signing up. Please try again.');
        return;
      }

      // On successful signup, redirect to login
      navigate('/login-page');
    } catch (error) {
      console.error('Signup error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section with Image */}
      <div className="w-1/2">
        <img
          src="https://vaultguardbucket2024.s3.amazonaws.com/pexels-ozge-taskiran-85164141-12651886.webp"
          alt="Signup illustration"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Section with Signup Form */}
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
            Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 dark:text-title-dark text-title-light"
              >
                Email
              </label>
              <input
                id="username"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm placeholder:text-gray-400 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 dark:text-title-dark text-title-light"
              >
                Master Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 block w-full rounded-md border-0 py-1.5 shadow-sm placeholder:text-gray-400 sm:text-sm"
              />
              <Link
                to="/reset-master-password"
                className="text-sm font-semibold dark:text-title-dark text-title-light hover:text-highlight-light"
              >
                Forgot password?
              </Link>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              icon={PiSealCheckDuotone}
              label="Sign Up"
              className="dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light dark:hover:bg-highlight-dark hover:bg-highlight-light"
            />
          </form>

          <p className="mt-10 text-center text-sm dark:text-alltext-dark text-alltext-light">
            Already have an account?{' '}
            <Link to="/login-page" className="underline dark:text-highlight-dark text-highlight-light">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
