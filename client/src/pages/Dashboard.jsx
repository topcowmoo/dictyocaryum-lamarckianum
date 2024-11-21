import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom"; // For accessing context from the Outlet
import Sidebar from "../components/Sidebar"; // Sidebar component for category selection
import VaultEntries from "../components/VaultEntries"; // Component to display entries
import VaultDisplay from "../components/VaultDisplay"; // Component to display selected entry details
import AddPassword from "../components/AddPassword"; // Form component to add a new password entry

const apiURL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entries, setEntries] = useState([]);
  const [showAddPassword, setShowAddPassword] = useState(false);
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

  // Filter entries based on category and searchQuery
  const filteredEntries = entries.filter((entry) => {
    if (!entry) return false; // Skip undefined or null entries
  
    const serviceName = entry.serviceName?.toLowerCase() || "";
    const query = searchQuery?.toLowerCase() || "";
  
    const matchesSearch = !query || serviceName.includes(query);
  
    if (selectedCategory === "Deleted") {
      return matchesSearch && entry.category === "Deleted";
    }
  
    if (selectedCategory === "All") {
      return matchesSearch && entry.category !== "Deleted";
    }
  
    return matchesSearch && entry.category === selectedCategory;
  });

  
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

  const handleAddNewEntry = (newEntry) => {
    setEntries((prevEntries) => [newEntry, ...prevEntries]);
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

  const handleEditSubmit = (updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry._id === updatedEntry._id ? updatedEntry : entry
      )
    );
    setSelectedEntry(null); // Close EditEntry form
  };

  const handleCloseEditEntry = () => {
    setSelectedEntry(null); // Close EditEntry form
  };

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
            <AddPassword onClose={handleCloseAddPassword}
            onAddEntry={handleAddNewEntry} />
          ) : (
            <VaultDisplay
              service={selectedEntry?.serviceName}
              username={selectedEntry?.username}
              label={selectedEntry?.label}
              password={selectedEntry?.password}
              Icon={selectedEntry?.Icon}
              entryId={selectedEntry?._id}
              onDelete={() => handleDelete(selectedEntry._id)}
              onEdit={handleEditSubmit}
              setEntries={setEntries}
              setSelectedEntry={setSelectedEntry}
              onClose={handleCloseEditEntry}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
