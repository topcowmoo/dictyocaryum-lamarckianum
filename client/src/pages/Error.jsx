// Importing necessary hooks, components, and context
import { useContext } from "react";
import { Link } from "react-router-dom"; // For linking to the home page
import Button from "../components/Button"; // Custom Button component
import { PiArrowCircleLeftDuotone } from "react-icons/pi"; // Icon for the button
import { DarkModeContext } from "../context/DarkModeContext"; // Context for dark mode functionality

function Error() {
  // Accessing the dark mode state from context
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`grid min-h-screen h-full grid-cols-1 lg:grid-cols-2 ${
        isDarkMode ? "dark:bg-hefo-dark" : "bg-hefo-light" // Conditional background based on dark mode
      }`}
    >
      {/* Left Side: Text Section */}
      <div className="flex flex-col h-full justify-start items-start p-6 lg:p-12">
        {/* Header with App Logo */}
        <header className="mb-32">
          <a href="#">
            <span className="sr-only">VaultGuard Password Locker</span> {/* Screen reader text for accessibility */}
            <img
              alt="App logo"
              src="https://vaultguardbucket2024.s3.amazonaws.com/logo.svg" // Logo of the app
              className="h-32 w-auto"
            />
          </a>
        </header>

        {/* Main Content */}
        <main className="max-w-lg">
          <p className="lg:text-[32px] dark:text-title-dark text-title-light">404</p> {/* Error code */}
          <h1 className="mt-4 text-[40px] tracking-tight dark:text-alltext-dark text-alltext-light sm:text-6xl">
            Page not found
          </h1> {/* Error message */}
          <p className="mt-6 text-[22px] dark:text-alltext-dark text-alltext-light">
            Sorry, we couldn’t find the page you’re looking for.
          </p> {/* Error description */}
          
          {/* Button to navigate back to the Home page */}
          <div className="mt-10">
            <Link to="/" className="inline-block">
              <Button
                icon={PiArrowCircleLeftDuotone} // Back arrow icon
                label="Home" // Button label
                className="dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light text-[22px]"
              />
            </Link>
          </div>
        </main>
      </div>

      {/* Right Side: Image Section */}
      <div className="sm:hidden md:block h-full">
        <img
          alt="Error image" // Description of the image for accessibility
          src="https://vaultguardbucket2024.s3.us-east-1.amazonaws.com/pexels-alleksana-4271933.webp" // Image displayed on the right side
          className="h-full w-full object-cover brightness-90" // Image styling
        />
      </div>
    </div>
  );
}

export default Error; // Exporting the Error component as the default export
