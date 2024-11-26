import PropTypes from "prop-types";
import { useState } from "react";
import { serviceIcons, serviceNames } from "../utils/serviceIcons";

const VaultEntries = ({ onSelectEntry, selectedCategory, searchQuery, entries }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const safeEntries = entries || [];
  const filteredEntries = safeEntries.filter((entry) => {
    const serviceName = entry.serviceName?.toLowerCase() || "";
    
    if (searchQuery) {
      return serviceName.includes(searchQuery.toLowerCase());
    }

    const categoryMatch =
      selectedCategory === "All" ||
      (selectedCategory &&
        entry.category?.toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim());

    return categoryMatch;
  });

  const normalizeKey = (serviceName) => {
    if (!serviceName) return "default";
    const key = serviceName.toLowerCase().replace(/\s+/g, ""); // Remove spaces
    if (key === "amazonprimevideo") return "prime"; // Explicitly map to 'prime'
    return key;
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry._id);
    const normalizedKey = normalizeKey(entry.serviceName);
    onSelectEntry({
      ...entry,
      label: entry.label,
      Icon: serviceIcons[normalizedKey] || serviceIcons.default,
    });
  };

  return (
    <div className="p-4 space-y-4">
      {filteredEntries.map((entry, index) => {
        const normalizedKey = normalizeKey(entry.serviceName);
        const Icon = serviceIcons[normalizedKey] || serviceIcons.default;
        const displayName = serviceNames[normalizedKey] || "Unnamed Service";
        const isSelected = selectedEntry === entry._id;

        const customSizes = {
          zoom: 43,
          ebay: 43,
          bankofamerica: 45,
          default: 42,
        };

        return (
          <div
            key={entry._id || index}
            onClick={() => handleEntryClick(entry)}
            className={`flex flex-col items-start cursor-pointer p-3 transition ${
              isSelected
                ? "dark:text-highlight-dark text-highlight-light"
                : "dark:text-alltext-dark text-alltext-light"
            } hover:underline`}
          >
            <div
              className={`flex items-center ${
                customSizes[normalizedKey] > 42 ? "space-x-5" : "space-x-6"
              }`}
            >
              {/* Display Icon */}
              <Icon
                size={customSizes[normalizedKey] || customSizes.default}
                className={`${
                  isSelected ? "text-highlight-light dark:text-highlight-dark" : ""
                }`}
              />
              <div className="flex flex-col">
                {/* Display Name */}
                <span className={`text-[18px] ${isSelected ? "" : ""}`}>
                  {displayName}
                </span>
                {/* Display Label */}
                {entry.label && (
                    <span className={`text-[15px] dark:text-buttonbgc-dark ${isSelected ? "" : ""}`}>
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
