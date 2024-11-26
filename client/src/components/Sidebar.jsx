import { useState } from "react";
import PropTypes from "prop-types";
import {
  PiFilmSlateDuotone,
  PiTrashDuotone,
  PiWifiHighDuotone,
  PiCardholderDuotone,
  PiFolderOpenDuotone,
  PiIdentificationBadgeDuotone,
  PiKeyDuotone,
  PiPlusCircleDuotone,
} from "react-icons/pi";

function Sidebar({ onSelectCategory, onAddNewEntry }) {
  const [selectedItemId, setSelectedItemId] = useState(null);

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
    setSelectedItemId(item.id);
    onSelectCategory(item.title);
  };

  const handleAddNewEntry = () => {
    setSelectedItemId("new");
    onAddNewEntry();
  };

  return (
    <div className="flex flex-col dark:bg-sidebar-dark bg-sidebar-light p-4">
      {/* Sidebar Items in Two Columns */}
      <div className="grid grid-cols-2 gap-4 mt-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`relative flex items-center space-x-2 p-4 rounded-[4px] border-2 transition cursor-pointer ${
              selectedItemId === item.id
                ? "bg-hefo-light dark:bg-hefo-dark border-buttonti-dark dark:border-buttonti-light shadow-md shadow-buttonbgc-light dark:shadow-buttonbgc-dark transform translate-y-[-2px] "
                : "border-buttonti-dark dark:border-buttonti-light hover:bg-hefo-light dark:hover:bg-hefo-dark"
            }`}
            onClick={() => handleItemClick(item)}
          >
            <div className="shrink-0 text-highlight-light dark:text-highlight-dark">{item.icon}</div>
            <div className="flex-grow">
              <p
                className={`text-sm font-medium text-alltext-light dark:text-alltext-dark ${
                  selectedItemId === item.id ? "font-bold" : ""
                }`}
              >
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Entry */}
<div
  className={`flex justify-center items-center space-x-2 p-4 mt-6 rounded-[4px] border-2 transition cursor-pointer ${
    selectedItemId === "new"
      ? "bg-hefo-light dark:bg-hefo-dark border-buttonti-dark dark:border-buttonti-light shadow-md shadow-buttonbgc-light dark:shadow-buttonbgc-dark transform translate-y-[-2px]"
      : "border-buttonti-dark dark:border-buttonti-light hover:bg-hefo-light dark:hover:bg-hefo-dark"
  }`}
  onClick={handleAddNewEntry}
>
  <div className="shrink-0 text-highlight-light dark:text-highlight-dark">
    <PiPlusCircleDuotone size={28} />
  </div>
  <div>
    <p
      className={`text-sm text-alltext-light dark:text-alltext-dark ${
        selectedItemId === "new" ? "font-bold" : ""
      }`}
    >
      Add New Entry
    </p>
  </div>
</div>
</div>
  );
}

Sidebar.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
  onAddNewEntry: PropTypes.func.isRequired,
};

export default Sidebar;
