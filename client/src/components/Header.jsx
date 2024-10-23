import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from "../context/DarkModeContext";
import { useContext } from "react";
import Button from "./Button";
import { PiSunDuotone, PiMoonDuotone } from "react-icons/pi";

function Header() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (

    <div className="flex justify-between items-center w-full max-full p-6 dark:bg-hefo-dark bg-hefo-light">
 
     {/* Logo as a button that navigates to home */}
     <button
        onClick={() => navigate('/')} // Navigate to Home page
        className="flex-shrink-0 hidden md:block cursor-pointer focus:outline-none"
        aria-label="Navigate to Home" // For accessibility
      >
        <img
          src="https://vaultguardbucket2024.s3.amazonaws.com/logo.svg"
          alt="App logo"
          className="w-[80px] h-[80px] object-contain"
        />
      </button>

      {/* Right Section: Dark/Light mode toggle button */}
      <div className="ml-auto">
        <Button
          icon={isDarkMode ? PiSunDuotone : PiMoonDuotone}
          label={isDarkMode ? "Light" : "Dark"}
          onClick={toggleDarkMode}
        />
      </div>
    
    </div>
  );
}

export default Header;
