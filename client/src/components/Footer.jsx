import { PiUserCircleDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer
      className="relative bottom-0 left-0 right-0 flex items-center justify-between p-5 text-[10px] md:text-[14px] w-full z-10 h-[60px] dark:bg-hefo-dark bg-hefo-light"
      role="contentinfo"
    >

<Button
    icon={PiUserCircleDuotone}
    label="Account"
    onClick={() => navigate('/profile')}
  />
      {/* Left Section: GitHub link and copyright */}
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
    </footer>
  );
}

export default Footer;
