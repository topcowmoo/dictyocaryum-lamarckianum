import { useState, useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import {
  PiSealCheckDuotone,
  PiCheckCircleDuotone,
  PiXCircleDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
  PiSunDuotone,
  PiMoonDuotone,
} from "react-icons/pi";

function ResetMasterPassword() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  // Handle email input with sanitation
  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim().replace(/[<>"'`]/g, ""));
  };

  // Validate password and update state
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

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message || "Error resetting password. Please try again.");
        return;
      }

      setEmail("");
      setPassword("");
      navigate("/login-page");
    } catch (err) {
      console.error("Reset error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative flex min-h-screen">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 left-4 cursor-pointer">
        {isDarkMode ? (
          <PiSunDuotone size={30} onClick={toggleDarkMode} className="dark:text-highlight-dark" />
        ) : (
          <PiMoonDuotone size={30} onClick={toggleDarkMode} className="text-highlight-light" />
        )}
      </div>

      {/* Reset Password Section */}
      <div className="w-full flex flex-col items-center bg-hefo-light dark:bg-hefo-dark p-16">
        <div className="sm:w-full sm:max-w-sm">
          <img
            src="https://vaultguardbucket2024.s3.amazonaws.com/logo.svg"
            alt="App logo"
            className="mx-auto h-36 w-auto"
          />
          <h1 className="mt-10 text-center text-2xl font-bold tracking-tight leading-9 dark:text-title-dark text-title-light">
            VaultGuard Password Locker
          </h1>
          <h2 className="mt-2 text-center text-lg font-medium dark:text-alltext-dark text-alltext-light">
            Reset Master Password
          </h2>
        </div>

        <div className="mt-10 sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleReset}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium dark:text-title-dark text-title-light">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="mt-2 block w-full rounded-[4px] border-0 py-1.5 shadow-xl sm:text-sm"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium dark:text-title-dark text-title-light">
                New Master Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="mt-2 block w-full rounded-[4px] border-0 py-1.5 shadow-xl sm:text-sm"
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
                      <PiCheckCircleDuotone size={20} className="text-highlight-light dark:text-highlight-dark" />
                    ) : (
                      <PiXCircleDuotone size={20} className="text-red-500" />
                    )}
                    <span className="ml-2 text-sm dark:text-alltext-dark text-alltext-light">
                      {getRequirementText(key)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            {/* Reset Button */}
            <div className="flex justify-center">
              <Button
                icon={PiSealCheckDuotone}
                label="Reset"
                type="submit"
                className="dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light dark:hover:bg-highlight-dark hover:bg-highlight-light"
              />
            </div>
          </form>

          <p className="mt-6 text-center text-sm dark:text-alltext-dark text-alltext-light">
            Remember your password?{" "}
            <Link to="/login-page" className="underline dark:text-highlight-dark text-highlight-light">
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
    case "minLength":
      return "At least 14 characters";
    case "hasUppercase":
      return "At least one uppercase letter";
    case "hasLowercase":
      return "At least one lowercase letter";
    case "hasNumber":
      return "At least one number";
    case "hasSpecialChar":
      return "At least one special character (@, $, !, %, *, ?, &)";
    default:
      return "";
  }
};

export default ResetMasterPassword;
