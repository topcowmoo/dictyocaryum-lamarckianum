import Button from '../components/Button';
import PropTypes from 'prop-types';
import { PiMoonDuotone, PiSunDimDuotone } from "react-icons/pi";

function Header({ toggleDarkMode, isDarkMode }) {
  return (

    <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto">
    {/* Logo on the left */}
    <div className="flex-shrink-0 hidden md:block ">
      <img
        src="https://vaultguardbucket2024.s3.amazonaws.com/lightlogo.webp"
        alt="Personal logo"
        className="w-[40px] h-[42px] object-contain"
      />
    </div>
    <div className="hidden md:flex items-center justify-end flex-shrink-0">
      {/* Conditionally render Dark or Light button based on current mode */}
      {isDarkMode ? (
        <Button
          icon={PiSunDimDuotone}
          label="Light"
          onClick={toggleDarkMode} // Trigger dark mode toggle
        />
      ) : (
        <Button
          icon={PiMoonDuotone}
          label="Dark"
          onClick={toggleDarkMode} 
        />
      )}
    </div>
    </div>
  );
}

Header.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired, // Required prop to toggle the mode
  isDarkMode: PropTypes.bool.isRequired, // Current state of the mode (light or dark)
};

export default Header;
