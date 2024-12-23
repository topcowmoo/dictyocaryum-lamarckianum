// Importing necessary hooks, context, and components
import { useState, useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext'; // Context for managing dark mode
import { useNavigate, Link } from 'react-router-dom'; // For navigation and linking between routes
import Button from '../components/Button'; // Custom button component
import {
  PiSealCheckDuotone,
  PiCheckCircleDuotone,
  PiXCircleDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiSunDuotone,
  PiMoonDuotone,
} from 'react-icons/pi'; // Importing icons from react-icons

function SignupPage() {
  // Accessing dark mode context and state
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  // State for form input and validation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggles password visibility
  const [error, setError] = useState(null); // Error message state
  const navigate = useNavigate(); // Hook for navigation

  // State for password requirements
  const [requirements, setRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  // Handles changes in the email input field
  const handleEmailChange = (e) => {
    // Sanitize email input to prevent XSS attacks
    const sanitizedEmail = e.target.value.trim().replace(/[<>"'`]/g, '');
    setEmail(sanitizedEmail);
  };

  // Handles changes in the password input field and checks requirements
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Updating password requirement checks
    setRequirements({
      minLength: value.length >= 14,
      hasUppercase: /[A-Z]/.test(value),
      hasLowercase: /[a-z]/.test(value),
      hasNumber: /\d/.test(value),
      hasSpecialChar: /[@$!%*?&]/.test(value),
    });
  };

  // Handles form submission and signup process
  const handleSignup = async (e) => {
    e.preventDefault();

    // Destructuring password requirement state
    const { minLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar } = requirements;

    // Checking if all password requirements are met
    if (!minLength || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      setError('Password does not meet the requirements.');
      return;
    }

    try {
      // Sending signup request to the API
      const response = await fetch('api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), // Sending email and password
        credentials: 'include', // Including cookies in the request
      });

      // Handling error responses from the API
      if (!response.ok) {
        const { message } = await response.json();
        setError(message || 'Error signing up. Please try again.');
        return;
      }

      // Navigating to the dashboard on successful signup
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  // Toggles the visibility of the password
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Dark Mode Toggle Button */}
      <div className="absolute top-4 right-4 cursor-pointer dark:text-alltext-dark text-alltext-light dark:hover:text-highlight-dark hover:text-highlight-light">
        {isDarkMode ? (
          <PiSunDuotone className="text-[22px] md:text-[26px] lg:text-[30px] 2xl:text-[45px]" onClick={toggleDarkMode} />
        ) : (
          <PiMoonDuotone className="text-[22px] md:text-[26px] lg:text-[30px] 2xl:text-[45px]" onClick={toggleDarkMode} />
        )}
      </div>

      {/* Left Image Section (only visible on medium screens and above) */}
      <div className="hidden md:block md:w-1/2 h-full overflow-hidden">
        <img
          src="https://vaultguardbucket2024.s3.us-east-1.amazonaws.com/logsign.webp"
          alt="Signup illustration"
          className="h-full w-full object-cover object-bottom"
          loading="lazy"
        />
      </div>

     {/* Right Form Section */}
<div className="w-full h-full md:w-1/2 flex flex-col dark:text-alltext-dark text-alltext-light bg-sidebar-light dark:bg-sidebar-dark p-8 md:p-16 justify-between">
  {/* Top Section: Logo */}
  <div className="flex flex-col items-center">
    <img
      src="https://vaultguardbucket2024.s3.us-east-1.amazonaws.com/vplogo.svg"
      alt="App logo"
      className="mx-auto w-auto h-16 md:h-24 xl:h-24 2xl:h-27"
    />
    <h1 className="dark:text-title-dark text-title-light mt-8 text-center text-[20px] md:text-3xl xl:text-[27px] 2xl:text-[44px]">
      VaultGuard Password Locker
    </h1>
    <h2 className="mt-9 text-center text-[18px] md:text-xl xl:text-[21px] 2xl:text-[25px]">
      Create a new account
    </h2>
  </div>

  {/* Middle Section: Signup Form */}
  <form className="space-y-4 w-full max-w-md mx-auto mb-7" onSubmit={handleSignup}>
    {/* Email Input */}
    <div>
      <label htmlFor="email" className="block text-sm md:text-base xl:text-[18px] 2xl:text-[20px]">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        required
        className="mt-1 p-2 block w-full rounded-[4px] shadow-2xl sm:text-sm md:text-base xl:text-[18px] 2xl:text-[20px] dark:text-alltext-light text-alltext-light"
      />
    </div>

    {/* Password Input */}
    <div>
      <label htmlFor="password" className="block text-sm md:text-base xl:text-[18px] 2xl:text-[20px]">Master Password</label>
      <div className="relative">
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          required
          className="mt-1 p-2 pr-10 block w-full rounded-[4px] shadow-2xl sm:text-sm md:text-base xl:text-[18px] 2xl:text-[20px] dark:text-alltext-light text-alltext-light"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-3 flex items-center dark:text-alltext-light text-alltext-light dark:hover:text-highlight-dark hover:text-highlight-light"
        >
          {showPassword ? <PiEyeClosedDuotone className="md:text-[18px] lg:text-[20px] 2xl:text-[24px]" /> : <PiEyeDuotone className="md:text-[18px] lg:text-[20px] 2xl:text-[24px]" />}
        </button>
      </div>

      {/* Password Requirements */}
      <div className="mt-4 space-y-1">
        {Object.entries(requirements).map(([key, met]) => (
          <div key={key} className="flex items-center">
            {met ? (
              <PiCheckCircleDuotone className="text-highlight-light dark:text-highlight-dark text-[24px]" />
            ) : (
              <PiXCircleDuotone className="text-[24px] text-alltext-light dark:text-alltext-dark" />
            )}
            <span className="ml-2 text-[13px] md:text-[11px] lg:text-[15px] xl:text-[18px] 2xl:text-[20px]">{getRequirementText(key)}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Error Message */}
    {error && <p className="text-red-500 text-xs md:text-sm">{error}</p>}

    {/* Signup Button */}
    <div className="flex justify-center mb-4">
      <Button icon={PiSealCheckDuotone} label="Sign Up" type="submit" className="text-sm md:text-base h-10 px-4 md:px-6 mt-9" iconSize={20} />
    </div>
  </form>

  {/* Bottom Section: Link to Login */}
  <p className="text-center text-xs md:text-[13px] lg:text-[15px] xl:text-[18px] 2xl:text-[20px] -mt-11 mb-11">
    Already have an account? <Link to="/login-page" className="underline dark:hover:text-highlight-dark hover:text-highlight-light">Login here</Link>
  </p>
</div>
</div>
  );
}

// Helper function to get password requirement text based on the key
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
