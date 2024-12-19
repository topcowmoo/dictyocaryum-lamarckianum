import PropTypes from "prop-types";
import { useState } from "react";
import { serviceIcons, serviceNames } from "../utils/serviceIcons";
import { normalizeKey } from "../utils/normalizeKey";

const VaultEntries = ({ onSelectEntry, selectedCategory, searchQuery, entries }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const safeEntries = entries || [];

  const filteredEntries = safeEntries.filter((entry) => {
    const serviceName = entry.serviceName?.toLowerCase() || "";
    const label = entry.label?.toLowerCase() || "";
    const username = entry.username?.toLowerCase() || "";
    const query = searchQuery?.toLowerCase() || "";

    if (query) {
      return (
        serviceName.includes(query) ||
        label.includes(query) ||
        username.includes(query)
      );
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
    const normalizedKey = normalizeKey(entry.serviceName);
    onSelectEntry({
      ...entry,
      Icon: serviceIcons[normalizedKey] || serviceIcons.default,
    });
  };

  

  return (
    <div className="p-4 space-y-4">
      {filteredEntries.map((entry) => {
        const normalizedKey = normalizeKey(entry.serviceName);
        const Icon = serviceIcons[normalizedKey] || serviceIcons.default;
        const displayName = serviceNames[normalizedKey] || serviceNames.default;
        const isSelected = selectedEntry === entry._id;

        return (
          <div
            key={entry._id}
            onClick={() => handleEntryClick(entry)}
            className={`flex flex-col items-start cursor-pointer p-3 transition ${
              isSelected
                ? "dark:text-title-dark text-title-light"
                : "dark:text-alltext-dark text-alltext-light"
            }`}
          >
            <div className="flex items-center space-x-5">
              <Icon size={42} className="text-highlight-light dark:text-highlight-dark" />
              <div className="flex flex-col">
                <span className="text-[18px]">{displayName}</span>
                {entry.label && <span className="text-[15px] text-gray-500">{entry.label}</span>}
                {entry.username && (
                  <span className="text-[14px] text-gray-400 italic">
                  {entry.username}
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
