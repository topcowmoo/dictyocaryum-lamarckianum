import { useState, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import {
  PiSealCheckDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiSunDuotone,
  PiMoonDuotone,
} from "react-icons/pi";

function LoginPage() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message || "Invalid email or password");
        return;
      }

      // Navigate to the dashboard on success
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 left-4 cursor-pointer dark:text-alltext-dark text-alltext-light dark:hover:text-highlight-dark hover:text-highlight-light">
        {isDarkMode ? (
          <PiSunDuotone size={40} onClick={toggleDarkMode} />
        ) : (
          <PiMoonDuotone size={40} onClick={toggleDarkMode} />
        )}
      </div>

      {/* Left Section with Login Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center dark:text-alltext-dark text-alltext-light bg-hefo-light dark:bg-hefo-dark p-8 md:p-16">
        <div className="w-full max-w-md">
          <img
            src="https://vaultguardbucket2024.s3.amazonaws.com/logo.svg"
            alt="App logo"
            className="mx-auto h-16 md:h-24 2xl:h-32 w-auto"
          />
          <h1 className="mt-6 text-center text-2xl md:text-3xl 2xl:text-[31px]">
            VaultGuard Password Locker
          </h1>
          <h2 className="mt-2 text-center text-lg md:text-xl 2xl:text-[25px]">
            Login to your account
          </h2>
        </div>

        <form className="space-y-4 mt-6 w-full max-w-md" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm md:text-base 2xl:text-[20px]">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 block w-full rounded-[4px] shadow-2xl sm:text-sm md:text-base 2xl:text-[20px] dark:text-alltext-light text-alltext-light"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm md:text-base 2xl:text-[20px]">
              Master Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Toggle between text and password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-2 pr-10 block w-full rounded-[4px] shadow-2xl sm:text-sm md:text-base 2xl:text-[20px] dark:text-alltext-light text-alltext-light"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center dark:text-alltext-light text-alltext-light"
              >
                {showPassword ? (
                  <PiEyeClosedDuotone size={20} />
                ) : (
                  <PiEyeDuotone size={20} />
                )}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-xs md:text-sm">{error}</p>}

          <div className="flex justify-center ">
            <Button
              icon={PiSealCheckDuotone}
              label="Login"
              type="submit"
              className="text-sm md:text-base h-10 px-2 md:px-6 md:mt-3 md:mb-3 "
              iconSize={20}
            />
          </div>
        </form>

        <p className="mt-4 text-center text-xs md:text-sm lg:text-base 2xl:text-[20px]">
          Forgot master password?{" "}
          <Link
            to="/reset-master-password"
            className="underline hover:text-highlight-light dark:hover:text-highlight-dark transition-colors duration-200"
          >
            Reset here
          </Link>
        </p>

        <p className="mt-4 text-center text-xs md:text-sm lg:text-base 2xl:text-[20px]">
          Don&apos;t have an account?{" "}
          <Link
            to="/signup-page"
            className="underline hover:text-highlight-light dark:hover:text-highlight-dark transition-colors duration-200"
          >
            Sign up here
          </Link>
        </p>
      </div>

      {/* Right Section with Illustration */}
      <div className="hidden md:block md:w-1/2 h-full overflow-hidden">
        <img
          src="https://vaultguardbucket2024.s3.amazonaws.com/pexels-ozge-taskiran-85164141-12651886.webp"
          alt="Login illustration"
          className="h-full w-full object-cover object-bottom"
        />
      </div>
    </div>
  );
}

export default LoginPage;
