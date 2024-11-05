import PropTypes from "prop-types";
import serviceIcons from "../utils/serviceIcons";
import { PiUserCircleDuotone } from "react-icons/pi";

const VaultEntries = ({ onSelectEntry, selectedCategory, entries }) => {
  // Filter entries based on selected category
  const filteredEntries =
    selectedCategory === "All"
      ? entries
      : entries.filter((entry) => entry.category.toLowerCase() === selectedCategory.toLowerCase());

  if (!filteredEntries.length) return <p>No entries available in this category.</p>;

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
  selectedCategory: PropTypes.string.isRequired,
  entries: PropTypes.array.isRequired,
};

export default VaultEntries;
