import {
  PiCopyDuotone,
  PiPencilDuotone,
  PiEyeDuotone,
  PiEyeClosedDuotone,
} from "react-icons/pi";

function EntryDisplay() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center relative">
      <p>Coming soon…</p>
      <div className="flex gap-4 mt-4">
        <PiCopyDuotone size={30} />
        <PiPencilDuotone size={30} />
        <PiEyeDuotone size={30} />
        <PiEyeClosedDuotone size={30} />
      </div>

      {/* Name and Year at Bottom Right */}
      <div className="flex items-center dark:text-alltext-dark text-alltext-light absolute bottom-4 right-5">
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
    </div>
  );
}

export default EntryDisplay;
