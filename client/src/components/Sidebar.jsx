import {
  PiUserCircleDuotone,
  PiFilmSlateDuotone,
  PiTrashDuotone,
  PiWifiHighDuotone,
  PiCardholderDuotone,
  PiFolderOpenDuotone,
  PiIdentificationBadgeDuotone,
  PiKeyDuotone,
} from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const navigate = useNavigate();
  
  const items = [
    { id: 6, title: "Entertainment", icon: <PiFilmSlateDuotone size={28} /> },
    { id: 7, title: "Deleted", icon: <PiTrashDuotone size={28} /> },
    { id: 5, title: "Wi-Fi", icon: <PiWifiHighDuotone size={28} /> },
    { id: 3, title: "Cards", icon: <PiCardholderDuotone size={28} /> },
    { id: 1, title: "All", icon: <PiFolderOpenDuotone size={28} /> },
    { id: 2, title: "Identification", icon: <PiIdentificationBadgeDuotone size={28} /> },
    { id: 4, title: "Login", icon: <PiKeyDuotone size={28} /> },
  ];

  // Sort items by id
  const sortedItems = items.sort((a, b) => a.id - b.id);

  return (
    <div className="relative grid grid-cols-1 gap-8 p-6 h-full">
      {sortedItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center justify-center transition-all"
        >
          <div className="flex flex-row justify-start w-full gap-2">
            <div className="dark:text-alltext-dark text-alltext-light hover:dark:text-highlight-dark hover:text-highlight-light hover:cursor-pointer">{item.icon}</div>
            <h2 className="text-lg dark:text-title-dark text-title-light hover:dark:text-highlight-dark hover:text-highlight-light text-[20px] hover:cursor-pointer">{item.title}</h2>
          </div>
        </div>
      ))}

      {/* Profile Section at Bottom Left */}
      <div
        className="fixed bottom-3 cursor-pointer flex items-center"
        onClick={() => navigate('/profile')}
      >
        <PiUserCircleDuotone className="text-[34px] dark:text-title-dark text-title-light dark:hover:text-highlight-dark hover:text-highlight-light" />
        <span className="ml-2 text-lg dark:text-title-dark text-title-light">
          
        </span>
      </div>
    </div>
  );
}

export default SideBar;
