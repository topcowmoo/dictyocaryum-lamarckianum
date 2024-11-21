import PropTypes from "prop-types";
import { useState } from "react";
import serviceIcons from "../utils/serviceIcons";

const VaultEntries = ({ onSelectEntry, selectedCategory, searchQuery, entries }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);

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
    setSelectedEntry(entry._id);
    onSelectEntry({
      ...entry,
      label: entry.label,
      Icon: serviceIcons[entry.serviceName?.toLowerCase()] || serviceIcons.default,
    });
  };

  return (
    <div className="p-4 space-y-4">
      {filteredEntries.map((entry, index) => {
        const Icon = serviceIcons[entry.serviceName?.toLowerCase()] || serviceIcons.default;
        const isSelected = selectedEntry === entry._id;

        return (
          <div
            key={entry._id || index}
            onClick={() => handleEntryClick(entry)}
            className={`flex flex-col items-start cursor-pointer p-3 transition ${
              isSelected
                ? "dark:text-highlight-dark text-highlight-light font-bold"
                : "dark:text-alltext-dark text-alltext-light"
            } hover:underline`}
          >
            <div className="flex items-center space-x-4">
              <Icon size={32} className={`w-10 h-10 ${isSelected ? "text-highlight-light dark:text-highlight-dark" : ""}`} />
              <div className="flex flex-col">
                <span className={`text-[18px] ${isSelected ? "font-bold" : ""}`}>
                  {entry.serviceName || "Unnamed Service"}
                </span>
                {entry.label && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {entry.label}
                  </span>
                )}
              </div>
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
