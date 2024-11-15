// Importing necessary hooks, context, and components
import { useState, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext"; // Context for dark mode functionality
import { useNavigate, Link } from "react-router-dom"; // For navigation and linking between routes
import Button from "../components/Button"; // Custom Button component
import {
  PiSealCheckDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiSunDuotone,
  PiMoonDuotone,
} from "react-icons/pi"; // Importing icons from react-icons

function LoginPage() {
  // Accessing dark mode context and state
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  // State variables for email, password, password visibility, and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  // Hook for navigation
  const navigate = useNavigate();

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission
    try {
      // Sending a POST request to the login endpoint
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Sending email and password in the request body
        credentials: "include", // Include cookies in the request
      });

      // Handling errors from the response
      if (!response.ok) {
        const { message } = await response.json();
        setError(message || "Invalid email or password"); // Display error message
        return;
      }

      // Navigate to the dashboard on successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again."); // Display generic error message
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev); // Toggle between text and password input types
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 left-4 cursor-pointer dark:text-alltext-dark text-alltext-light dark:hover:text-highlight-dark hover:text-highlight-light">
        {isDarkMode ? (
          <PiSunDuotone className="text-[23px] md:text-[26px] lg:text-[30px] 2xl:text-[45px]" onClick={toggleDarkMode} />
        ) : (
          <PiMoonDuotone className="text-[23px] md:text-[26px] lg:text-[30px] 2xl:text-[45px]" onClick={toggleDarkMode} />
        )}
      </div>

      {/* Left Section with Login Form */}
      <div className="w-full h-full md:w-1/2 flex flex-col items-center dark:text-alltext-dark text-alltext-light bg-hefo-light dark:bg-hefo-dark p-8 md:p-16 xl:p-20 2xl:min-h-screen justify-center">
        <div className="w-full max-w-md xl:max-w-lg">
          {/* App Logo */}
          <img
            src="https://vaultguardbucket2024.s3.us-east-1.amazonaws.com/vplogo.svg"
            alt="App logo"
            className="mx-auto h-16 md:h-24 xl:h-28 2xl:h-32 w-auto"
          />
          <h1 className="mt-6 text-center text-[21px] md:text-3xl xl:text-[27px] 2xl:text-[31px]">
            VaultGuard Password Locker
          </h1>
          <h2 className="mt-4 text-center text-[18px] md:text-xl xl:text-[21px] 2xl:text-[25px]">
            Login to your account
          </h2>
        </div>

        {/* Login Form */}
        <form className="space-y-4 mt-6 w-full max-w-md xl:max-w-lg" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm md:text-base xl:text-[18px] 2xl:text-[20px]">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              required
              className="mt-1 p-2 block w-full rounded-[4px] shadow-2xl sm:text-sm md:text-base xl:text-[18px] 2xl:text-[20px] dark:text-alltext-light text-alltext-light"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm md:text-base xl:text-[18px] 2xl:text-[20px]">
              Master Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Toggle between text and password
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                required
                className="mt-1 p-2 pr-10 block w-full rounded-[4px] shadow-2xl sm:text-sm md:text-base xl:text-[18px] 2xl:text-[20px] dark:text-alltext-light text-alltext-light"
              />
              {/* Button to toggle password visibility */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center dark:text-alltext-light text-alltext-light"
              >
                {showPassword ? (
                  <PiEyeClosedDuotone className="md:text-[18px] lg:text-[20px] 2xl:text-[24px]" />
                ) : (
                  <PiEyeDuotone className="md:text-[18px] lg:text-[20px] 2xl:text-[24px]" />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          <div className="h-5 md:h-6 xl:h-t">
            {error ? (
              <p className="text-red-500 text-xs md:text-sm xl:text-base">{error}</p>
            ) : (
              <p className="invisible text-xs md:text-sm xl:text-base">Placeholder for error</p> // Placeholder to maintain space
            )}
          </div>

          {/* Login Button */}
          <div className="flex justify-center">
            <Button
              icon={PiSealCheckDuotone}
              label="Login"
              type="submit"
              className="text-sm md:text-base xl:text-[18px] h-10 md:h-12 xl:h-14 px-4 md:px-6 xl:px-8 mt-2 mb-2"
              iconSize={20}
            />
          </div>
        </form>

        {/* Links for Resetting Password and Signing Up */}
        <p className="mt-6 text-center text-xs md:text-[13px] lg:text-[15px] xl:text-[18px] 2xl:text-[20px]">
          Forgot master password?{" "}
          <Link
            to="/reset-master-password"
            className="underline hover:text-highlight-light dark:hover:text-highlight-dark transition-colors duration-200"
          >
            Reset here
          </Link>
        </p>

        <p className="mt-6 text-center text-xs md:text-[13px] lg:text-[15px] xl:text-[18px] 2xl:text-[20px]">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup-page"
            className="underline hover:text-highlight-light dark:hover:text-highlight-dark transition-colors duration-200"
          >
            Sign up here
          </Link>
        </p>
      </div>

      {/* Right Section with Illustration (visible only on medium screens and above) */}
      <div className="hidden md:block md:w-1/2 h-full overflow-hidden">
        <img
          src="https://vaultguardbucket2024.s3.us-east-1.amazonaws.com/pexels-ozge-taskiran-85164141-12651886.webp"
          alt="Login illustration"
          className="h-full w-full object-cover object-bottom"
        />
      </div>
    </div>
  );
}

export default LoginPage;
