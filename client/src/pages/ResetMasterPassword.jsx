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

  const handleEmailChange = (e) => {
    setEmail(e.target.value.trim().replace(/[<>"'`]/g, ""));
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
    <div className="relative flex flex-col md:flex-row min-h-screen">
      {/* Dark Mode Toggle */}
      <div className="absolute top-4 left-4 cursor-pointer dark:text-alltext-dark text-alltext-light dark:hover:text-highlight-dark hover:text-highlight-light">
        {isDarkMode ? (
          <PiSunDuotone className="text-[23px] md:text-[26px] lg:text-[30px] 2xl:text-[45px]" onClick={toggleDarkMode} />
        ) : (
          <PiMoonDuotone className="text-[23px] md:text-[26px] lg:text-[30px] 2xl:text-[45px]" onClick={toggleDarkMode} />
        )}
      </div>

      {/* Left Section: Reset Password Form */}
      <div className="w-full h-full md:w-1/2 flex flex-col items-center justify-center dark:text-title-dark text-title-light bg-sidebar-light dark:bg-sidebar-dark p-8 md:p-16 xl:p-20">
        <div className="w-full max-w-md xl:max-w-lg">
          <img
            src="https://vaultguardbucket2024.s3.us-east-1.amazonaws.com/vplogo.svg"
            alt="App logo"
            className="mx-auto h-16 md:h-24 xl:h-28 2xl:h-32 w-auto"
          />
          <h1 className="mt-6 text-center text-[21px] md:text-3xl xl:text-[27px] 2xl:text-[31px]">
            VaultGuard Password Locker
          </h1>
        </div>
        <div className="mt-10 sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleReset}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium dark:text-alltext-dark text-alltext-light"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className="mt-1 p-2 block w-full rounded-[4px] shadow-2xl sm:text-sm md:text-base xl:text-[18px] 2xl:text-[20px] dark:text-alltext-light text-alltext-light"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium dark:text-alltext-dark text-alltext-light"
              >
                New Master Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="mt-1 p-2 pr-10 block w-full rounded-[4px] shadow-2xl sm:text-sm md:text-base xl:text-[18px] 2xl:text-[20px] dark:text-alltext-light text-alltext-light"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                 className="absolute inset-y-0 right-3 flex items-center dark:text-alltext-light text-alltext-light"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <PiEyeClosedDuotone size={20} /> : <PiEyeDuotone size={20} />}
                </button>
              </div>
              <div className="mt-4 space-y-1">
                {Object.entries(requirements).map(([key, met]) => (
                  <div key={key} className="flex items-center">
                    {met ? (
                      <PiCheckCircleDuotone
                        size={24}
                        className="text-highlight-light dark:text-highlight-dark"
                      />
                    ) : (
                      <PiXCircleDuotone size={24} className=" text-alltext-light dark:text-alltext-dark" />
                    )}
                    <span className="ml-2 text-sm dark:text-alltext-dark text-alltext-light">
                      {getRequirementText(key)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
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

      {/* Right Section: Image */}
      <div className="hidden md:block md:w-1/2 h-full">
        <img
          src="https://vaultguardbucket2024.s3.us-east-1.amazonaws.com/pexels-francis-desjardins-1613813-3314113.webp"
          alt="Reset password illustration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

// Helper function for password requirement text
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
