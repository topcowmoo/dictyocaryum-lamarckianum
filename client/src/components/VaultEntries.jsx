import PropTypes from "prop-types";
import serviceIcons from "../utils/serviceIcons";
import { PiUserCircleDuotone } from "react-icons/pi";

const VaultEntries = ({ onSelectEntry, selectedCategory, searchQuery, entries }) => {
  const filteredEntries = entries.filter((entry) => {
    if (searchQuery) {
      return entry.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    }

    const categoryMatch = selectedCategory === "All" || (selectedCategory && entry.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim());
    return categoryMatch;
  });

  return (
    <div className="p-4 space-y-4">
      {filteredEntries.map((entry) => {
        const Icon = serviceIcons[entry.serviceName?.toLowerCase()] || PiUserCircleDuotone;
        return (
          <div
            key={entry._id}
            onClick={() => onSelectEntry({ ...entry, Icon })}
            className="flex items-center cursor-pointer p-3 border rounded hover:bg-gray-100 transition"
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4">
              <Icon size={32} />
            </div>
            <div className="text-lg font-semibold">
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
