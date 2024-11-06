import { useNavigate } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import SearchBar from "./SearchBar";
import { PiSunDuotone, PiMoonDuotone } from "react-icons/pi";

function Header({ setSearchQuery }) {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className="flex justify-start items-center w-full p-6 dark:bg-hefo-dark bg-hefo-light border-b-2 border-display-dark dark:border-display-light">
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
            className="w-[55px] h-[55px] object-contain"
          />
        </button>
      </div>

      {/* Center Section: SearchBar */}
      <div className="flex justify-center flex-grow px-8">
        <SearchBar onSearchChange={setSearchQuery} />
      </div>

      {/* Right Section: Dark/Light Mode Toggle */}
      <div className="flex justify-end items-center">
        {isDarkMode ? (
          <PiSunDuotone size={30} onClick={toggleDarkMode} className="dark:text-title-dark text-title-light" />
        ) : (
          <PiMoonDuotone size={30} onClick={toggleDarkMode} className="dark:text-title-dark text-title-light" />
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
};

export default Header;
