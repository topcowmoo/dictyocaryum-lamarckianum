import { useState } from "react";
import PropTypes from "prop-types";
import { PiCaretDown } from "react-icons/pi";

function Dropdown({ items, onSelect, placeholder = "Select an Option" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(placeholder);

  const handleSelect = (item) => {
    setSelectedItem(item.title);
    setIsOpen(false); // Close the dropdown after selecting
    onSelect(item); // Call the onSelect prop to update the parent state
  };

  return (
    <div className="relative w-full">
      {/* Selected Item */}
      <div
        className="bg-white p-2 rounded-[4px] cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedItem}</span>
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
}

Dropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.element,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired, // Ensure onSelect is required
  placeholder: PropTypes.string,
};

export default Dropdown;
