import { useState } from "react";
import PropTypes from "prop-types";
import {
  PiFilmSlateDuotone,
  PiTrashDuotone,
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
    { id: 5, title: "Identification", icon: <PiIdentificationBadgeDuotone size={28} /> },
    { id: 6, title: "Deleted", icon: <PiTrashDuotone size={28} /> },
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
      {/* Sidebar Items with Responsive Grid */}
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-3 mt-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`relative flex items-center space-x-1 pl-2 py-4 rounded-[4px] transition cursor-pointer ${
              selectedItemId === item.id
                ? "bg-hefo-light dark:bg-hefo-light border-2  border-highlight-light dark:border-highlight-dark transform translate-y-[-2px]"
                : "bg-vault-light dark:bg-vault-dark hover:bg-hefo-light dark:hover:bg-display-dark"
            }`}
            onClick={() => handleItemClick(item)}
          >
            <div className="shrink-0 text-highlight-light dark:text-highlight-dark">
              {item.icon}
            </div>
            <div className="flex-grow">
              <p
                className={`text-[16px] ${
                  selectedItemId === item.id
                    ? "text-alltext-light dark:text-alltext-light"
                    : "text-alltext-light dark:text-alltext-dark"
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
        className={`relative flex items-center space-x-2 pl-2 py-4 mt-6 rounded-[4px] transition cursor-pointer ${
          selectedItemId === "new"
            ? "bg-hefo-light dark:bg-hefo-light border-2 border-highlight-light dark:border-highlight-dark transform translate-y-[-2px]"
            : "bg-vault-light dark:bg-vault-dark hover:bg-hefo-light dark:hover:bg-display-dark"
        }`}
        onClick={handleAddNewEntry}
      >
        <div className="shrink-0 text-highlight-light dark:text-highlight-dark">
          <PiPlusCircleDuotone size={28} />
        </div>
        <div className="flex-grow">
          <p
            className={`text-[16px] ${
              selectedItemId === "new"
                ? "text-alltext-light dark:text-alltext-light"
                : "text-alltext-light dark:text-alltext-dark"
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
