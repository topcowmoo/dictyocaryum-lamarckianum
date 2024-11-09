import { useState } from "react";
import {
    PiFilmSlateDuotone,
    PiTrashDuotone,
    PiWifiHighDuotone,
    PiCardholderDuotone,
    PiFolderOpenDuotone,
    PiIdentificationBadgeDuotone,
    PiKeyDuotone,
  } from "react-icons/pi";

function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Select a Category");

    const items = [
        { id: 1, title: "All", icon: <PiFolderOpenDuotone size={28} /> },
        { id: 2, title: "Cards", icon: <PiCardholderDuotone size={28} /> },
        { id: 3, title: "Entertainment", icon: <PiFilmSlateDuotone size={28} /> },
        { id: 4, title: "Login", icon: <PiKeyDuotone size={28} /> },
        { id: 5, title: "Wi-Fi", icon: <PiWifiHighDuotone size={28} /> },
        { id: 6, title: "Identification", icon: <PiIdentificationBadgeDuotone size={28} /> },
        { id: 7, title: "Deleted", icon: <PiTrashDuotone size={28} /> },
      ];

      const handleSelect = (items) => {
        setSelectedItem(items.title);
        setIsOpen(false);
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
    
    export default Dropdown;