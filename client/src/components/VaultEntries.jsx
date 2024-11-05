import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import serviceIcons from "../utils/serviceIcons"; // Import the serviceIcons object
import { PiUserCircleDuotone } from "react-icons/pi"; // Default icon if none is found

const VaultEntries = ({ onSelectEntry }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("/api/locker");
        if (!response.ok) throw new Error("Failed to fetch entries");
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  if (loading) return <p>Loading vault entries...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4 space-y-4">
      {entries.map((entry) => {
        const Icon = serviceIcons[entry.serviceName.toLowerCase()] || PiUserCircleDuotone;

        return (
          <div
            key={entry._id}
            onClick={() => onSelectEntry({ ...entry, Icon })} // Include the Icon component in the entry
            className="flex items-center cursor-pointer p-3 border rounded hover:bg-gray-100 transition"
          >
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-4">
              <Icon size={32} />
            </div>
            <div className="text-lg font-semibold">{entry.serviceName}</div>
          </div>
        );
      })}
    </div>
  );
};

VaultEntries.propTypes = {
  onSelectEntry: PropTypes.func.isRequired,
};

export default VaultEntries;
