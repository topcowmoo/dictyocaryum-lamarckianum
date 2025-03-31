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
    const name = entry.name?.toLowerCase() || "";
    const username = entry.username?.toLowerCase() || "";
    const query = searchQuery?.toLowerCase() || "";

    if (query) {
      return name.includes(query) || username.includes(query);
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
  className={`flex flex-col items-start cursor-pointer p-3 rounded-md transition-all duration-200 ${
    isSelected
      ? "lg:bg-hefo-light lg:border-l-4 lg:border-highlight-light lg:dark:bg-highlight-dark/10 lg:dark:border-highlight-dark lg:dark:text-alltext-dark lg:text-alltext-light"
      : "hover:bg-highlight-light/5 dark:hover:bg-highlight-dark/5 text-alltext-light dark:text-alltext-dark"
  }`}
>
  <div className="flex items-center space-x-5 w-full">
    <div className="flex flex-col w-full">
      {entry.name && (
        <span className="text-[16px] text-zinc-800 dark:text-zinc-300">
          {entry.name}
        </span>
      )}
      {entry.username && (
        <span className="text-[14px] text-zinc-600 dark:text-zinc-400">
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
