import { PiUserCircleDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Footer() {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  console.log("Current user in footer:", user); // Debugging: log current user
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bottom-0 left-0 right-0 flex items-center justify-between p-4 text-[10px] md:text-[14px] w-full z-10 dark:bg-hefo-dark bg-hefo-light"
      role="contentinfo"
    >
      {/* Icon Section */}
      <div
        className="cursor-pointer flex items-center"
        onClick={() => navigate("/profile")}
      >
        <PiUserCircleDuotone className="text-[40px] dark:text-alltext-dark text-alltext-light dark:hover:text-highlight-dark hover:text-highlight-light" />
        {user && (
          <span className="ml-2 dark:text-alltext-dark text-alltext-light dark:hover:text-highlight-dark hover:text-highlight-light hover:underline text-[12px] md:text-[14px]">
            {user.email || "Anonymous"}
          </span>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center dark:text-alltext-dark text-alltext-light absolute right-5">
        <a
          href="https://github.com/topcowmoo"
          target="_blank"
          rel="noopener noreferrer"
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
