// Importing necessary hooks and components
import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom"; // For accessing context from the Outlet
import Sidebar from "../components/Sidebar"; // Sidebar component for category selection
import VaultEntries from "../components/VaultEntries"; // Component to display entries
import VaultDisplay from "../components/VaultDisplay"; // Component to display selected entry details
import AddPassword from "../components/AddPassword"; // Form component to add a new password entry

// Logging environment variables to check if VITE_API_URL is set correctly
console.log("Environment Variables:", import.meta.env); 
const apiURL = import.meta.env.VITE_API_URL;
console.log("apiURL:", apiURL); // Logs the API URL (e.g., http://localhost:8001)

function Dashboard() {
  // State variables to manage selected category, selected entry, entries list, and form visibility
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entries, setEntries] = useState([]);
  const [showAddPassword, setShowAddPassword] = useState(false);

  // Accessing searchQuery from the Outlet context
  const { searchQuery } = useOutletContext() || {}; // Ensure searchQuery is safely destructured

  const addEntryButtonRef = useRef(null);

  // Fetching entries from the API
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch(`${apiURL}/api/locker`, {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setEntries(data);
        } else {
          console.error("Failed to fetch entries");
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  // Handlers
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedEntry(null);
    setShowAddPassword(false);
  };

  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry);
    setShowAddPassword(false);
  };

  const handleAddNewEntry = () => {
    setShowAddPassword(true);
  };

  const handleCloseAddPassword = () => {
    setShowAddPassword(false);
    if (addEntryButtonRef.current) {
      addEntryButtonRef.current.blur();
    }
  };

  const handleDelete = async (entryId) => {
    try {
      const response = await fetch(`${apiURL}/api/locker/${entryId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        setEntries((prevEntries) =>
          prevEntries.filter((entry) => entry._id !== entryId)
        );
        setSelectedEntry(null);
      } else {
        alert("Failed to delete entry");
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleEdit = (updatedEntry) => {
    setSelectedEntry(updatedEntry);
  };

  const filteredEntries = entries.filter((entry) => {
    const serviceName = entry.serviceName?.toLowerCase() || "";
    const query = searchQuery?.toLowerCase() || "";

    if (!query || serviceName.includes(query)) {
      if (selectedCategory && selectedCategory !== "All") {
        return entry.category === selectedCategory;
      }
      return true;
    }

    return false;
  });

  return (
    <div className="h-full flex flex-col">
      <div className="h-full grid grid-cols-[300px_1fr_2fr]">
        {/* Sidebar */}
        <Sidebar
          onSelectCategory={handleCategorySelect}
          onAddNewEntry={handleAddNewEntry}
        />

        {/* Vault Entries Section */}
        <div className="dark:bg-vault-dark bg-vault-light p-4 h-full overflow-y-auto">
          {filteredEntries.length > 0 && !showAddPassword && (
            <VaultEntries
              entries={filteredEntries}
              selectedCategory={selectedCategory}
              onSelectEntry={handleEntrySelect}
              searchQuery={searchQuery}
            />
          )}
        </div>

        {/* Vault Display or Add Password Section */}
        <div className="dark:bg-display-dark bg-display-light p-4 h-full overflow-y-auto">
          {showAddPassword ? (
            <AddPassword onClose={handleCloseAddPassword} />
          ) : (
            <VaultDisplay
              service={selectedEntry?.serviceName}
              username={selectedEntry?.username}
              label={selectedEntry?.label}
              password={selectedEntry?.password}
              Icon={selectedEntry?.Icon}
              entryId={selectedEntry?._id}
              onDelete={() => handleDelete(selectedEntry._id)}
              onEdit={handleEdit}
              setEntries={setEntries}
              setSelectedEntry={setSelectedEntry}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;