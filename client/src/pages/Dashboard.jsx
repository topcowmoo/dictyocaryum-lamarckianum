import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom"; // For accessing context from the Outlet
import Sidebar from "../components/Sidebar"; // Sidebar component for category selection
import VaultEntries from "../components/VaultEntries"; // Component to display entries
import VaultDisplay from "../components/VaultDisplay"; // Component to display selected entry details
import AddEntry from "../components/AddEntry"; // Form component to add a new password entry

const apiURL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All"); // Default to "All" entries
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entries, setEntries] = useState([]);
  const [showAddEntry, setShowAddEntry] = useState(false);
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
    if (!entry) return false;
  
    const serviceName = entry.serviceName?.toLowerCase() || "";
    const query = searchQuery?.toLowerCase() || "";
  
    const matchesSearch = !query || serviceName.includes(query);
  
    // If no category is selected, only apply search logic
    if (!selectedCategory || selectedCategory === "All") {
      return matchesSearch && entry.category !== "Deleted";
    }
  
    // If "Deleted" is selected, show only deleted entries
    if (selectedCategory === "Deleted") {
      return matchesSearch && entry.category === "Deleted";
    }
  
    // Otherwise, filter by the selected category
    return matchesSearch && entry.category === selectedCategory;
  });
  

  // Handlers
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedEntry(null);
    setShowAddEntry(false);
  };

  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry);
    setShowAddEntry(false);
  };

  const handleAddNewEntry = async (newEntry) => {
    setEntries((prevEntries) => [newEntry, ...prevEntries]);

    // Fetch updated entries from the API to ensure all data is correct
    try {
      const response = await fetch(`${apiURL}/api/locker`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const updatedEntries = await response.json();
        setEntries(updatedEntries); // Replace with the updated entries
      }
    } catch (error) {
      console.error("Error fetching updated entries:", error);
    }
    setShowAddEntry(false);
  };

  const handleCloseAddEntry = () => {
    setShowAddEntry(false);
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
      <div className="h-full grid grid-cols-[380px_1fr_2fr]">
        {/* Sidebar */}
        <Sidebar
          onSelectCategory={handleCategorySelect}
          onAddNewEntry={() => setShowAddEntry(true)}
        />

        {/* Vault Entries Section */}
        <div className="dark:bg-vault-dark bg-vault-light p-4 h-full overflow-y-auto">
          {filteredEntries.length > 0 && !showAddEntry && (
            <VaultEntries
              entries={filteredEntries}
              selectedCategory={selectedCategory}
              onSelectEntry={handleEntrySelect}
              searchQuery={searchQuery}
            />
          )}
        </div>

        {/* Vault Display or Add Password Section */}
        <div className="dark:bg-display-dark bg-display-light p-5 h-full overflow-y-auto">
          {showAddEntry ? (
            <AddEntry
              onClose={handleCloseAddEntry}
              onAddEntry={handleAddNewEntry}
            />
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
              category={selectedEntry?.category}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
