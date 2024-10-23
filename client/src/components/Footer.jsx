function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bottom-0 left-0 right-0 border-t-2 flex items-center justify-between p-5 text-[10px] md:text-[14px] w-full z-10 h-[60px] dark:bg-hefo-dark bg-hefo-light"
      role="contentinfo"
    >
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
