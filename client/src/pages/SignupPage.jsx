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
  PiMoonDuotone,
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

  // Sanitize input and set email state
  const handleEmailChange = (e) => {
    const sanitizedEmail = e.target.value.trim().replace(/[<>"'`]/g, '');
    setEmail(sanitizedEmail);
  };

  // Validate password and set password state
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
    console.log("Signup initiated");
  
    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        const { message } = await response.json();
        console.log("Signup error message:", message);
        setError(message || 'Error signing up. Please try again.');
        return;
      }
  
      const { token } = await response.json();
      console.log("Received token:", token);
      localStorage.setItem('token', token); // Store the token
  
      console.log("Navigating to dashboard...");
      setEmail('');
      setPassword('');
      navigate("/dashboard")  // Explicitly navigate to /dashboard for testing
    } catch (error) {
      console.error('Signup error:', error);
      setError('Something went wrong. Please try again.');
    }
  };
  
  

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative flex min-h-screen">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 right-4 cursor-pointer">
        {isDarkMode ? (
          <PiSunDuotone size={30} onClick={toggleDarkMode} />
        ) : (
          <PiMoonDuotone size={30} onClick={toggleDarkMode} />
        )}
      </div>

      {/* Left Image Section */}
      <div className="w-1/2 h-screen overflow-hidden">
        <img
          src="https://vaultguardbucket2024.s3.amazonaws.com/pexels-ozge-taskiran-85164141-12651886.webp"
          alt="Signup illustration"
          className="h-full w-full object-cover object-bottom"
        />
      </div>

      {/* Signup Form Section */}
      <div className="w-1/2 flex flex-col items-center bg-hefo-light dark:bg-hefo-dark p-16">
        <div className="sm:w-full sm:max-w-sm">
          <img
            src="https://vaultguardbucket2024.s3.amazonaws.com/logo.svg"
            alt="App logo"
            className="mx-auto h-36 w-auto"
          />
          <h1 className="mt-10 text-center text-2xl font-bold">VaultGuard Password Locker</h1>
          <h2 className="mt-2 text-center text-lg">Create a new account</h2>
        </div>

        <div className="mt-10 sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignup}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="mt-2 block w-full rounded-[4px] shadow-xl sm:text-sm"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium">Master Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="mt-2 block w-full rounded-[4px] shadow-xl sm:text-sm"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <PiEyeClosedDuotone size={20} /> : <PiEyeDuotone size={20} />}
                </button>
              </div>

              {/* Password Requirements */}
              <div className="mt-4 space-y-1">
                {Object.entries(requirements).map(([key, met]) => (
                  <div key={key} className="flex items-center">
                    {met ? (
                      <PiCheckCircleDuotone size={20} className="text-highlight-light" />
                    ) : (
                      <PiXCircleDuotone size={20} className="text-red-500" />
                    )}
                    <span className="ml-2 text-sm">
                      {getRequirementText(key)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button icon={PiSealCheckDuotone} label="Sign Up" type="submit" />
            </div>
          </form>

          <p className="mt-10 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login-page" className="underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper function to get text for each requirement
const getRequirementText = (key) => {
  switch (key) {
    case 'minLength':
      return 'At least 14 characters';
    case 'hasUppercase':
      return 'At least one uppercase letter';
    case 'hasLowercase':
      return 'At least one lowercase letter';
    case 'hasNumber':
      return 'At least one number';
    case 'hasSpecialChar':
      return 'At least one special character (@, $, !, %, *, ?, &)';
    default:
      return '';
  }
};

export default SignupPage;
