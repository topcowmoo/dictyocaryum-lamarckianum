import PropTypes from "prop-types";
import {
  PiFilmSlateDuotone,
  PiTrashDuotone,
  PiWifiHighDuotone,
  PiCardholderDuotone,
  PiFolderOpenDuotone,
  PiIdentificationBadgeDuotone,
  PiKeyDuotone,
} from "react-icons/pi";

function Sidebar({ onSelectCategory }) {
  const items = [
    { id: 1, title: "All", icon: <PiFolderOpenDuotone size={28} /> },
    { id: 2, title: "Entertainment", icon: <PiFilmSlateDuotone size={28} /> },
    { id: 3, title: "Deleted", icon: <PiTrashDuotone size={28} /> },
    { id: 4, title: "Wi-Fi", icon: <PiWifiHighDuotone size={28} /> },
    { id: 5, title: "Cards", icon: <PiCardholderDuotone size={28} /> },
    { id: 6, title: "Identification", icon: <PiIdentificationBadgeDuotone size={28} /> },
    { id: 7, title: "Login", icon: <PiKeyDuotone size={28} /> },
  ];

  return (
    <div className="relative grid grid-cols-1 gap-8 p-6 h-full">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center cursor-pointer p-2 hover:bg-gray-100 transition"
          onClick={() => onSelectCategory(item.title)} // Pass the exact title to filter
        >
          <div className="flex items-center gap-2">
            <span>{item.icon}</span>
            <span className="text-lg">{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

Sidebar.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
};

export default Sidebar;
