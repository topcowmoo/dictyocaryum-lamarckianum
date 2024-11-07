import { useState, useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import {
  PiSealCheckDuotone,
  PiCheckCircleDuotone,
  PiXCircleDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiSunDuotone,
  PiMoonDuotone
} from 'react-icons/pi';

function SignupPage() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [requirements, setRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const handleEmailChange = (e) => {
    const sanitizedEmail = e.target.value.trim().replace(/[<>"'`]/g, '');
    setEmail(sanitizedEmail);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setRequirements({
      minLength: value.length >= 14,
      hasUppercase: /[A-Z]/.test(value),
      hasLowercase: /[a-z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecialChar: /[@$!%*?&]/.test(value),
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies in the request
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message || 'Error signing up. Please try again.');
        return;
      }

      navigate("/dashboard"); // Navigate to the dashboard on success
    } catch (error) {
      console.error('Signup error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 cursor-pointer dark:text-alltext-dark text-alltext-light dark:hover:text-highlight-dark hover:text-highlight-light">
        {isDarkMode ? <PiSunDuotone size={40} onClick={toggleDarkMode} /> : <PiMoonDuotone size={40} onClick={toggleDarkMode} />}
      </div>

      {/* Left Image Section (hidden on sm and below) */}
      <div className="hidden md:block md:w-1/2 h-full overflow-hidden">
        <img
          src="https://vaultguardbucket2024.s3.amazonaws.com/pexels-ozge-taskiran-85164141-12651886.webp"
          alt="Signup illustration"
          className="h-full w-full object-cover object-bottom"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center dark:text-alltext-dark text-alltext-light bg-hefo-light dark:bg-hefo-dark p-8 md:p-16">
        <div className="w-full max-w-md">
          <img
            src="https://vaultguardbucket2024.s3.amazonaws.com/logo.svg"
            alt="App logo"
            className="mx-auto h-16 md:h-24 w-auto"
          />
          <h1 className="mt-6 text-center text-2xl md:text-3xl">VaultGuard Password Locker</h1>
          <h2 className="mt-2 text-center text-lg md:text-xl">Create a new account</h2>
        </div>

        <form className="space-y-4 mt-6 w-full max-w-md" onSubmit={handleSignup}>
          <div>
            <label htmlFor="email" className="block text-sm md:text-base">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="mt-1 p-2 block w-full rounded-[4px] shadow-2xl sm:text-sm md:text-base dark:text-alltext-light text-alltext-light"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm md:text-base">Master Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                required
                className="mt-1 p-2 block w-full rounded-[4px] shadow-2xl sm:text-sm md:text-base dark:text-alltext-light text-alltext-light"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center dark:text-alltext-light text-alltext-light"
              >
                {showPassword ? <PiEyeClosedDuotone size={20} /> : <PiEyeDuotone size={20} />}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="mt-4 space-y-1">
              {Object.entries(requirements).map(([key, met]) => (
                <div key={key} className="flex items-center">
                  {met ? <PiCheckCircleDuotone size={20} className="text-highlight-light dark:text-highlight-dark" /> : <PiXCircleDuotone size={20} className="text-red-500" />}
                  <span className="ml-2 text-sm md:text-base">{getRequirementText(key)}</span>
                </div>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-xs md:text-sm">{error}</p>}

          <div className="flex justify-center">
            <Button icon={PiSealCheckDuotone} label="Sign Up" type="submit" className="text-sm md:text-base h-10 px-4 md:px-6" iconSize={20} />
          </div>
        </form>

        <p className="mt-6 text-center text-sm md:text-base">
          Already have an account? <Link to="/login-page" className="underline dark:hover:text-highlight-dark hover:text-highlight-light">Login here</Link>
        </p>
      </div>
    </div>
  );
}

// Helper function for password requirements
const getRequirementText = (key) => {
  switch (key) {
    case 'minLength':
      return 'At least 14 characters';
    case 'hasUppercase':
      return 'One uppercase letter';
    case 'hasLowercase':
      return 'One lowercase letter';
    case 'hasNumber':
      return 'One number';
    case 'hasSpecialChar':
      return 'One special character (@, $, !, %, *, ?, &)';
    default:
      return '';
  }
};

export default SignupPage;