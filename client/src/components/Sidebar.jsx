import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import AddPasswordForm from "./AddPasswordForm";
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

function Sidebar({ onSelectCategory }) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Corrected state variable

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
    setSelectedItemId("new"); // Unique identifier for "Add New Entry"
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Sidebar Items */}
      <div className="flex flex-col gap-7">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center cursor-pointer p-2 transition dark:text-alltext-dark text-alltext-light hover:underline"
            onClick={() => handleItemClick(item)}
          >
            <div className="flex items-center gap-2">
              <span
                className={`${
                  selectedItemId === item.id
                    ? "dark:text-highlight-dark text-highlight-light font-bold"
                    : ""
                }`}
              >
                {item.icon}
              </span>
              <span
                className={`text-[18px] ${
                  selectedItemId === item.id
                    ? "dark:text-highlight-dark text-highlight-light font-bold text-shadow-pop-top"
                    : ""
                }`}
              >
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Entry Item at the Bottom */}
      <div
        className="flex items-center cursor-pointer p-2 mt-auto transition dark:text-alltext-dark text-alltext-light hover:underline"
        onClick={handleAddNewEntry}
      >
        <div className="flex items-center gap-2">
          <span
            className={`${
              selectedItemId === "new"
                ? "dark:text-highlight-dark text-highlight-light font-bold"
                : ""
            }`}
          >
            <PiPlusCircleDuotone size={28} />
          </span>
          <span
            className={`text-[18px] ${
              selectedItemId === "new"
                ? "dark:text-highlight-dark text-highlight-light font-bold text-shadow-pop-top"
                : ""
            }`}
          >
            Add New Entry
          </span>
        </div>
      </div>

      {/* Modal for Add New Entry */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <AddPasswordForm />
        </Modal>
      )}
    </div>
  );
}

Sidebar.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
};

export default Sidebar;
