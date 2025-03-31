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

function Sidebar({ onSelectCategory, onAddNewEntry, selectedItem }) {
  const items = [
    { id: 1, title: "All", icon: <PiFolderOpenDuotone size={27} /> },
    { id: 2, title: "Cards", icon: <PiCardholderDuotone size={27} /> },
    { id: 3, title: "Entertainment", icon: <PiFilmSlateDuotone size={27} /> },
    { id: 4, title: "Login", icon: <PiKeyDuotone size={27} /> },
    { id: 5, title: "Identification", icon: <PiIdentificationBadgeDuotone size={27} /> },
    { id: 6, title: "Deleted", icon: <PiTrashDuotone size={27} /> },
  ];

  const handleItemClick = (item) => {
    onSelectCategory(item.title);
  };

  const handleAddNewEntry = () => {
    onAddNewEntry();
  };

  return (
    <div className="flex flex-col dark:bg-sidebar-dark bg-sidebar-light p-4 pb-10 sm:pb-4">

      {/* Sidebar Items with Responsive Grid */}
      <div className="grid grid-cols-1 gap-3 mt-3 w-full">


        {items.map((item) => (
          <div
          key={item.id}
          className={`w-full flex items-center space-x-1 pl-2 py-4 rounded-[4px] transition cursor-pointer ${
            selectedItem === item.title
              ? "bg-hefo-light dark:bg-hefo-light border-2 border-highlight-light dark:border-highlight-dark transform translate-y-[-2px]"
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
                  selectedItem === item.title
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
        className={`relative flex items-center space-x-2 pl-2 py-4 mt-3 rounded-[4px] transition cursor-pointer ${
          selectedItem === "new"
            ? "bg-hefo-light dark:bg-hefo-light border-2 border-highlight-light dark:border-highlight-dark transform translate-y-[-2px]"
            : "bg-vault-light dark:bg-vault-dark hover:bg-hefo-light dark:hover:bg-display-dark"
        }`}
        onClick={handleAddNewEntry}
      >
        <div className="shrink-0 text-highlight-light dark:text-highlight-dark">
          <PiPlusCircleDuotone size={27} />
        </div>
        <div className="flex-grow">
          <p
            className={`text-[16px] ${
              selectedItem === "new"
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
  selectedItem: PropTypes.string.isRequired,
};

export default Sidebar;
