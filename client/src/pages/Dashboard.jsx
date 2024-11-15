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
  const { searchQuery } = useOutletContext();

  // Fetching entries from the API whenever the selectedCategory changes
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        // Constructing the API URL based on the selected category
        const url = selectedCategory
          ? `${apiURL}/api/locker?category=${selectedCategory}`
          : `${apiURL}/api/locker`; // Fetch all entries if no category is selected

        console.log("Fetching from URL:", url); // Logging the URL being fetched

        // Sending a GET request to the API
        const response = await fetch(url, {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          setEntries(data); // Updating the entries state with fetched data
        } else {
          console.error("Failed to fetch entries:", response.statusText);
          setEntries([]); // Clear entries on error
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
        setEntries([]); // Clear entries on error
      }
    };

    fetchEntries(); // Call the fetchEntries function
  }, [selectedCategory]); // Dependency array to trigger effect when selectedCategory changes

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedEntry(null); // Clear the selected entry
    setEntries([]); // Clear entries temporarily
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
  const handleDelete = () => {
    console.log("Entry deleted");
    setSelectedEntry(null); // Clear the selection after deletion
  };

  // Handle entry editing
  const handleEdit = (updatedEntry) => {
    console.log("Entry updated:", updatedEntry);
    setSelectedEntry(updatedEntry); // Update the selected entry
  };

  // Filtering entries based on the search query and selected category
  const filteredEntries = entries.filter((entry) => {
    const serviceName = entry.serviceName?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    // Check if the entry matches the search query and the selected category
    const matchesSearch = serviceName.includes(query);
    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "All" ||
      (selectedCategory &&
        entry.category?.toLowerCase().trim() === selectedCategory.toLowerCase().trim());

    return matchesSearch && matchesCategory; // Return entries that match both criteria
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
          {/* Show VaultEntries component when a category is selected or a search query exists */}
          {(selectedCategory || searchQuery) && !showAddPassword && (
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
              password={selectedEntry?.password}
              Icon={selectedEntry?.Icon}
              onDelete={handleDelete} // Pass delete handler
              onEdit={handleEdit} // Pass edit handler
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard; // Exporting the Dashboard component
