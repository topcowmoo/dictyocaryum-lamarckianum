import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { useContext } from "react";
import SearchBar from "./SearchBar";
import { PiSunDuotone, PiMoonDuotone } from "react-icons/pi";

function Header() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className="flex justify-between items-center w-full p-6 dark:bg-hefo-dark bg-hefo-light">
      {/* Left Section: Logo */}
      <div className="flex items-center">
        <button
          onClick={() => navigate("/")}
          className="flex-shrink-0 cursor-pointer focus:outline-none"
          aria-label="Navigate to Home"
        >
          <img
            src="https://vaultguardbucket2024.s3.amazonaws.com/logo.svg"
            alt="App logo"
            className="w-[80px] h-[80px] object-contain"
          />
        </button>
      </div>

      {/* Center Section: SearchBar */}
      <div className="flex-grow px-8">
        <SearchBar />
      </div>

      {/* Right Section: Dark/Light Mode Toggle */}
      <div className="flex items-center">
      <div className="absolute top-10 right-4 pr-3 cursor-pointer">
  {isDarkMode ? (
    <div className="dark:text-title-dark text-title-light dark:hover:text-highlight-dark hover:text-highlight-light ">
      <PiSunDuotone size={30} onClick={toggleDarkMode} />
    </div>
  ) : (
    <div className="dark:text-title-dark text-title-light dark:hover:text-highlight-dark hover:text-highlight-light">
      <PiMoonDuotone size={30} onClick={toggleDarkMode} />
    </div>
  )}
</div>
      </div>
    </div>
  );
}

export default Header;
