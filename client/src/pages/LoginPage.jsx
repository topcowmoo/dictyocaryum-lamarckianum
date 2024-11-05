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
      });
  
      if (!response.ok) {
        const { message } = await response.json();
        setError(message || "Invalid email or password");
        return;
      }
  
      const data = await response.json();
      localStorage.setItem("token", data.token); // Store the token
      navigate("/dashboard"); // Navigate to the dashboard on success
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative flex min-h-screen">
    {/* Dark Mode Toggle Icon in Top-Left */}
    <div className="absolute top-4 left-4 cursor-pointer">
  {isDarkMode ? (
    <div className="dark:text-alltext-dark">
      <PiSunDuotone size={30} onClick={toggleDarkMode} />
    </div>
  ) : (
    <div className="text-alltext-light">
      <PiMoonDuotone size={30} onClick={toggleDarkMode} />
    </div>
  )}
</div>


      {/* Left Section with Login Form */}
      <div className="w-1/2 flex flex-col justify-start items-center bg-hefo-light dark:bg-hefo-dark p-16">
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
            Login to your account
          </h2>
        </div>

        <form className="space-y-6 mt-10 sm:w-full sm:max-w-sm" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 dark:text-title-dark text-title-light"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full rounded-[4px] px-3 border-0 py-1.5 shadow-xl sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 dark:text-title-dark text-title-light"
            >
              Master Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 block w-full rounded-[4px] border-0 py-1.5 px-3 shadow-xl sm:text-sm"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <PiEyeClosedDuotone size={20} /> : <PiEyeDuotone size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-center">
            <Button
              icon={PiSealCheckDuotone}
              label="Login"
              type="submit"
              className="dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light dark:hover:bg-highlight-dark hover:bg-highlight-light"
            />
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm dark:text-alltext-dark text-alltext-light">
            Forgot master password?{" "}
            <Link
              to="/reset-master-password"
              className="underline dark:text-highlight-dark text-highlight-light"
            >
              Reset here
            </Link>
          </p>

          <p className="mt-6 text-sm dark:text-alltext-dark text-alltext-light">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup-page"
              className="underline dark:text-highlight-dark text-highlight-light"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section with Image */}
      <div className="w-1/2 h-screen overflow-hidden">
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
