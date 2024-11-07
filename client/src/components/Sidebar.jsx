import PropTypes from "prop-types";
import {
  PiFilmSlateDuotone,
  PiTrashDuotone,
  PiWifiHighDuotone,
  PiCardholderDuotone,
  PiFolderOpenDuotone,
  PiIdentificationBadgeDuotone,
  PiKeyDuotone,
  PiPlusCircleDuotone
} from "react-icons/pi";
import Button from "./Button";
import { useState } from "react";

function Sidebar({ onSelectCategory }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    { id: 1, title: "All", icon: <PiFolderOpenDuotone size={28} /> },
    { id: 2, title: "Cards", icon: <PiCardholderDuotone size={28} /> },
    { id: 3, title: "Entertainment", icon: <PiFilmSlateDuotone size={28} /> },
    { id: 4, title: "Login", icon: <PiKeyDuotone size={28} /> },
    { id: 5, title: "Wi-Fi", icon: <PiWifiHighDuotone size={28} /> },
    { id: 6, title: "Identification", icon: <PiIdentificationBadgeDuotone size={28} /> },
    { id: 7, title: "Deleted", icon: <PiTrashDuotone size={28} /> },
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    onSelectCategory(item.title);
  };

  return (
    <div className="flex flex-col gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center cursor-pointer p-2 transition dark:text-alltext-dark text-alltext-light hover:underline"
          onClick={() => handleItemClick(item)}
        >
          <div className="flex items-center gap-2">
            <span
              className={`${
                selectedItem?.id === item.id
                  ? "dark:text-highlight-dark text-highlight-light font-bold "
                  : ""
              }`}
            >
              {item.icon}
            </span>
            <span
              className={`text-[18px] ${
                selectedItem?.id === item.id
                  ? "dark:text-highlight-dark text-highlight-light font-bold text-shadow-pop-top"
                  : ""
              }`}
            >
              {item.title}
            </span>
          </div>
        </div>
      ))}

      {/* Add New Entry Button */}
      <Button
        icon={PiPlusCircleDuotone}
        label="Add New Entry"
        size={20}
      />
    </div>
  );
}

Sidebar.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
};

export default Sidebar;
