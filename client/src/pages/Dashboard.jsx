// Importing necessary hooks and components
import { useState, useEffect } from "react";
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
          console.log("Fetched entries:", data);
          setEntries(data);
        } else {
          console.error("Failed to fetch entries:", response.statusText);
          setEntries([]);
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
        setEntries([]);
      }
    };

    fetchEntries(); // Call the fetchEntries function
  }, []); // Removed `selectedCategory` to fetch entries only once on mount

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedEntry(null); // Clear the selected entry
    setShowAddPassword(false); // Hide the AddPassword form
  };

  // Handle entry selection
  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry); // Set the selected entry
    setShowAddPassword(false); // Hide the AddPassword form
  };

  // Show the AddPassword form to add a new entry
  const handleAddNewEntry = () => {
    setShowAddPassword(true);
    setSelectedEntry(null); // Clear the selected entry
  };

  // Handle entry deletion
  const handleDelete = async (entryId) => {
    try {
      const response = await fetch(`${apiURL}/api/locker/${entryId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        alert('Password entry deleted successfully!');
        setEntries((prevEntries) => prevEntries.filter(entry => entry._id !== entryId));
        setSelectedEntry(null); // Clear the selected entry
      } else {
        alert('Failed to delete password entry. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting password entry:', error);
      alert('An error occurred while trying to delete the entry.');
    }
  };

  // Handle entry editing
  const handleEdit = (updatedEntry) => {
    console.log("Entry updated:", updatedEntry);
    setSelectedEntry(updatedEntry); // Update the selected entry
  };

  // Filtering entries based on the search query and selected category
  const filteredEntries = entries.filter((entry) => {
    const serviceName = entry.serviceName?.toLowerCase() || "";
    const query = searchQuery?.toLowerCase() || "";

    // Check if the entry matches the search query
    const matchesSearch = !query || serviceName.includes(query);

    // Check if the entry matches the selected category
    const matchesCategory = !selectedCategory || selectedCategory === "All"
      ? entry.category !== "Deleted" // Exclude "Deleted" category when "All" or no category is selected
      : selectedCategory === entry.category;

    // Return true if both conditions are satisfied
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Main content area */}
      <div className="h-full grid grid-cols-[300px_1fr_2fr]">
        {/* Sidebar for category selection */}
        <div className="p-4 h-full flex flex-col justify-start gap-4 dark:bg-sidebar-dark bg-sidebar-light">
          <Sidebar onSelectCategory={handleCategorySelect} onAddNewEntry={handleAddNewEntry} />
        </div>

        {/* Vault Entries Section */}
        <div className="dark:bg-vault-dark bg-vault-light p-4 h-full overflow-y-auto">
          {/* Show VaultEntries component when there are filtered entries */}
          {filteredEntries.length > 0 && !showAddPassword && (
            <VaultEntries
              entries={filteredEntries}
              selectedCategory={selectedCategory}
              onSelectEntry={handleEntrySelect}
              searchQuery={searchQuery} // Pass the searchQuery to VaultEntries
            />
          )}
        </div>

        {/* Vault Display Section */}
        <div className="dark:bg-display-dark bg-display-light p-4 h-full overflow-y-auto">
          {showAddPassword ? (
            <AddPassword /> // Show AddPassword form if adding a new entry
          ) : (
            <VaultDisplay
              service={selectedEntry?.serviceName}
              username={selectedEntry?.username}
              label={selectedEntry?.label}
              password={selectedEntry?.password}
              Icon={selectedEntry?.Icon}
              entryId={selectedEntry?._id}
              onDelete={() => handleDelete(selectedEntry._id)} // Pass delete handler
              onEdit={handleEdit} // Pass edit handler
              setEntries={setEntries}
              setSelectedEntry={setSelectedEntry}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard; // Exporting the Dashboard component
