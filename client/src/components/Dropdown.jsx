import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { PiCaretDown } from "react-icons/pi";

const Dropdown = ({
  items,
  onSelect,
  initialSelectedItem,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Dropdown starts closed
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem || null);
  const dropdownRef = useRef(null); // Ref to detect clicks outside the dropdown

  const handleSelect = (item) => {
    setSelectedItem(item); // Set selected item object
    setIsOpen(false); // Close dropdown
    onSelect(item); // Notify parent component
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close dropdown if click is outside
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks outside the dropdown
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Selected Item */}
      <div
        className="bg-white p-2 rounded-[4px] cursor-pointer flex items-center justify-between border border-gray-300"
        onClick={() => setIsOpen((prev) => !prev)} // Toggle dropdown manually
      >
        <span>{selectedItem?.title}</span>
        <PiCaretDown size={20} className="ml-2" />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute mt-2 border border-gray-300 bg-white rounded-[4px] w-full z-10">
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
  initialSelectedItem: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    icon: PropTypes.element,
  }),
};

export default Dropdown;
