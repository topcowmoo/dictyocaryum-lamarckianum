import PropTypes from "prop-types";
import { useState } from "react";

const VaultEntries = ({ onSelectEntry, selectedCategory, searchQuery, entries }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Ensure entries is always an array
  const safeEntries = entries || [];

  // Function to handle selecting an entry
  const handleEntryClick = (entry) => {
    setSelectedEntry(entry._id); // Update selected state
    onSelectEntry(entry); // Notify parent component
  };

  // Filter entries based on search query and category
  const filteredEntries = safeEntries.filter((entry) => {
    const label = entry.label?.toLowerCase() || "";
    const username = entry.username?.toLowerCase() || "";
    const query = searchQuery?.toLowerCase() || "";

    if (query) {
      return label.includes(query) || username.includes(query);
    }

    const categoryMatch =
      selectedCategory === "All" ||
      (selectedCategory &&
        entry.category?.toLowerCase().trim() === selectedCategory.toLowerCase().trim());

    return categoryMatch;
  });

  return (
    <div className="p-4 space-y-4">
      {filteredEntries.map((entry) => {
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
              <div className="flex flex-col">
                {entry.label && (
                  <span className="text-[15px] text-zinc-800 dark:text-zinc-400">
                    {entry.label}
                  </span>
                )}
                {entry.username && (
                  <span className="text-[14px] dark:text-zinc-300 text-zinc-700 italic">
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
