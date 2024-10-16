import Button from "./Button";
import PropTypes from "prop-types";
import { PiMoonDuotone, PiSunDimDuotone } from "react-icons/pi";

function Footer({ toggleDarkMode, isDarkMode }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 border-t-2 dark:bg-secondarybgc-dark bg-secondarybgc-light flex items-center justify-between p-5 text-[10px] md:text-[14px] w-full z-10 h-[60px]"
      role="contentinfo"
    >
      {/* Left section: GitHub link and copyright */}
      <div className="flex items-center dark:text-alltext-dark text-alltext-light">
        <a
          href="https://github.com/topcowmoo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Salvatore Mammoliti's GitHub"
          title="Visit Salvatore Mammoliti's GitHub"
          className="hover:underline dark:text-alltext-dark dark:hover:text-highlight-dark text-alltext-light hover:text-highlight-light"
        >
          Salvatore Mammoliti
        </a>

        <span className="ml-2">&copy; {currentYear}</span>
      </div>

      {/* Right section: Dark/Light mode toggle button */}
      <div className="ml-auto"> {/* Pushes this section to the far right */}
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
    </footer>
  );
}

Footer.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired, // Required prop to toggle the mode
  isDarkMode: PropTypes.bool.isRequired, // Current state of the mode (light or dark)
};

export default Footer;
