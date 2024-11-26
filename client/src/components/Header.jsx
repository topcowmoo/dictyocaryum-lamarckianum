import { DarkModeContext } from "../context/DarkModeContext";
import PropTypes from "prop-types";
import { useContext } from "react";
import SearchBar from "./SearchBar";
import { PiSunDuotone, PiMoonDuotone } from "react-icons/pi";

function Header({ setSearchQuery }) {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className="flex justify-start items-center w-full p-4 dark:bg-hefo-dark bg-hefo-light">
      {/* Left Section: Logo */}
      <div className="flex items-center">
        <button
          className="flex-shrink-0 focus:outline-none"
        >
          <img
            src="https://vaultguardbucket2024.s3.us-east-1.amazonaws.com/vplogo.svg"
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
          <PiSunDuotone size={30} onClick={toggleDarkMode} className="dark:text-title-dark text-title-light dark:hover:text-highlight-dark hover:text-highlight-light cursor-pointer" />
        ) : (
          <PiMoonDuotone size={30} onClick={toggleDarkMode} className="dark:text-title-dark text-title-light dark:hover:text-highlight-dark hover:text-highlight-light cursor-pointer" />
        )}
      </div>
    </div>
  );
}

Header.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
};

export default Header;
