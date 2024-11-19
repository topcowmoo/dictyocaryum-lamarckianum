import PropTypes from "prop-types";
import { useState } from "react";
import serviceIcons from "../utils/serviceIcons";

const VaultEntries = ({ onSelectEntry, selectedCategory, searchQuery, entries }) => {
  const [selectedEntry, setSelectedEntry] = useState(null); // Track the selected entry

  const safeEntries = entries || [];
  const filteredEntries = safeEntries.filter((entry) => {
    const serviceName = entry.serviceName || "";

    if (searchQuery) {
      return serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    }

    const categoryMatch =
      selectedCategory === "All" ||
      (selectedCategory &&
        entry.category?.toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim());

    return categoryMatch;
  });

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry._id); // Set the selected entry ID
    onSelectEntry({
      ...entry,
      Icon: serviceIcons[entry.serviceName?.toLowerCase()] || serviceIcons.default, // Use default icon if no match
    });
  };

  return (
    <div className="p-4 space-y-4">
      {filteredEntries.map((entry) => {
        const Icon = serviceIcons[entry.serviceName?.toLowerCase()] || serviceIcons.default; // Use default icon if no match
        const isSelected = selectedEntry === entry._id; // Check if the entry is selected

        return (
          <div
            key={entry._id}
            onClick={() => handleEntryClick(entry)}
            className={`flex items-center cursor-pointer p-3 transition ${
              isSelected
                ? "dark:text-highlight-dark text-highlight-light font-bold" // Selected styles
                : "dark:text-alltext-dark text-alltext-light"
            } hover:underline`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center mr-4 transition-colors duration-200 ${
                isSelected ? "text-highlight-light dark:text-highlight-dark" : ""
              }`}
            >
              <Icon size={32} />
            </div>
            <div
              className={`text-[18px] transition-colors duration-200 ${
                isSelected ? "font-bold" : ""
              }`}
            >
              {entry.serviceName || "Unnamed Service"}
            </div>
          </div>
        );
      })}
    </div>
  );
};

VaultEntries.propTypes = {
  onSelectEntry: PropTypes.func.isRequired,
  selectedCategory: PropTypes.string,
  searchQuery: PropTypes.string,
  entries: PropTypes.array,
};

export default VaultEntries;
