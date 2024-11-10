import { useState } from "react";
import PropTypes from "prop-types";

function Dropdown({ items, placeholder = "Select an Option" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(placeholder);

  const handleSelect = (item) => {
    setSelectedItem(item.title);
    setIsOpen(false); // Close the dropdown after selecting
  };

  return (
    <div className="relative w-64">
      {/* Selected Item */}
      <div
        className="border border-gray-300 p-2 rounded cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedItem}</span>
        <span className="ml-2">&#x25BC;</span> {/* Down Arrow */}
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute mt-2 border border-gray-300 bg-white rounded shadow-lg w-full z-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(item)}
            >
              <span className="mr-2">{item.icon}</span>
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
  placeholder: PropTypes.string,
};

export default Dropdown;
