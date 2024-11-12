import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { PiArrowCircleLeftDuotone } from "react-icons/pi";
import { DarkModeContext } from "../context/DarkModeContext";

function Error() {
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <div className={`grid min-h-screen h-full grid-cols-1 lg:grid-cols-2 ${isDarkMode ? 'dark:bg-hefo-dark' : 'bg-hefo-light'}`}>
      {/* Left Side: Text */}
      <div className="flex flex-col h-full justify-start items-start p-6 lg:p-12">
        <header className="mb-32">
          <a href="#">
            <span className="sr-only">VaultGuard Password Locker</span>
            <img
              alt="App logo"
              src="https://vaultguardbucket2024.s3.amazonaws.com/logo.svg"
              className="h-32 w-auto"
            />
          </a>
        </header>
        <main className="max-w-lg">
          <p className="lg:text-[32px] dark:text-title-dark text-title-light ">404</p>
          <h1 className="mt-4 text-[40px] tracking-tight dark:text-alltext-dark text-alltext-light sm:text-6xl">
            Page not found
          </h1>
          <p className="mt-6 text-[22px] dark:text-alltext-dark text-alltext-light">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10">
            <Link to="/" className="inline-block">
              <Button
                icon={PiArrowCircleLeftDuotone}
                label="Home"
                className="dark:bg-buttonbgc-dark bg-buttonbgc-light dark:text-buttonti-dark text-buttonti-light text-[22px]"
              />
            </Link>
          </div>
        </main>
      </div>

      {/* Right Side: Image */}
      <div className="sm:hidden md:block h-full">
        <img
          alt="Error image"
          src="https://vaultguardbucket2024.s3.us-east-1.amazonaws.com/pexels-alleksana-4271933.webp"
          className="h-full w-full object-cover brightness-90"
        />
      </div>
    </div>
  );
}

export default Error;
