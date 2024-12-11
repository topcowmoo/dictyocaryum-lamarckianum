import { useState } from "react";
import PropTypes from "prop-types";
import { PiCaretDown } from "react-icons/pi";

const Dropdown = ({
  items,
  onSelect,
  placeholder = "Select an Option",
  initialSelectedItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem || null);

  const handleSelect = (item) => {
    setSelectedItem(item); // Set selected item object
    setIsOpen(false); // Close dropdown
    onSelect(item); // Notify parent component
  };

  return (
    <div className="relative w-full">
      {/* Selected Item */}
      <div
        className="bg-white p-2 rounded-[4px] cursor-pointer flex items-center justify-between border border-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedItem?.title || placeholder}</span>
        <PiCaretDown size={20} className="ml-2" />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute mt-2 border border-gray-300 bg-white rounded-[4px] shadow-lg w-full z-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(item)}
            >
              {item.icon && <span className="mr-2">{item.icon}</span>}
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.element,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  initialSelectedItem: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    icon: PropTypes.element,
  }),
};

export default Dropdown;
