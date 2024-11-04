import { PiUserCircleDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer
      className="relative bottom-0 left-0 right-0 flex items-center justify-between p-4 text-[10px] md:text-[14px] w-full z-10 h-[60px] dark:bg-hefo-dark bg-hefo-light border-t-2 border-display-dark dark:border-display-ligh"
      role="contentinfo"
    >
      {/* Icon Section */}
      <div
        className="cursor-pointer flex items-center"
        onClick={() => navigate('/profile')}
      >
        <PiUserCircleDuotone className="text-[40px] dark:text-title-dark text-title-light dark:hover:text-highlight-dark hover:text-highlight-light" />
        <span className="ml-2"></span>
      </div>

      {/* Right Section: Name and Year */}
      <div className="flex items-center dark:text-alltext-dark text-alltext-light absolute right-5">
        <a
          href="https://github.com/topcowmoo"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Salvatore Mammoliti's GitHub"
          title="Visit Salvatore Mammoliti's GitHub"
          className="hover:underline dark:hover:text-highlight-dark hover:text-highlight-light"
        >
          Salvatore Mammoliti
        </a>
        <span className="ml-3">&copy; {currentYear}</span>
      </div>
    </footer>
  );
}

export default Footer;
