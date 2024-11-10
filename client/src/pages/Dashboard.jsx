import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import VaultEntries from '../components/VaultEntries';
import VaultDisplay from '../components/VaultDisplay';
import AddPassword from '../components/AddPassword'; // Import AddPassword

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entries, setEntries] = useState([]);
  const [showAddPassword, setShowAddPassword] = useState(false); // State to toggle AddPassword form

  // Access searchQuery from Outlet context
  const { searchQuery } = useOutletContext();

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchEntries = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/locker?category=${selectedCategory}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setEntries(data);
        } else {
          console.error('Failed to fetch entries:', response.statusText);
          setEntries([]);
        }
      } catch (error) {
        console.error('Error fetching entries:', error);
        setEntries([]);
      }
    };

    fetchEntries();
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedEntry(null);
    setEntries([]);
    setShowAddPassword(false); // Hide the AddPassword form when selecting a category
  };

  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry);
    setShowAddPassword(false); // Hide the AddPassword form when an entry is selected
  };

  const handleAddNewEntry = () => {
    setShowAddPassword(true); // Show the AddPassword form
    setSelectedEntry(null); // Clear the selected entry
  };

  // Define handleDelete and handleEdit functions
  const handleDelete = () => {
    // Logic to delete the entry
    console.log("Entry deleted");
    setSelectedEntry(null); // Clear the selection
  };

  const handleEdit = (updatedEntry) => {
    // Logic to update the entry
    console.log("Entry updated:", updatedEntry);
    setSelectedEntry(updatedEntry); // Update the selected entry
  };

  const filteredEntries = entries.filter((entry) =>
    entry.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Main Content */}
      <div className="h-full grid grid-cols-[300px_1fr_2fr]">
        {/* Sidebar */}
        <div className="p-4 h-full flex flex-col justify-start gap-4 dark:bg-sidebar-dark bg-sidebar-light">
          <Sidebar onSelectCategory={handleCategorySelect} onAddNewEntry={handleAddNewEntry} />
        </div>

        {/* Vault Entries */}
        <div className="dark:bg-vault-dark bg-vault-light p-4 h-full overflow-y-auto">
          {selectedCategory && !showAddPassword && (
            <VaultEntries
              entries={filteredEntries}
              selectedCategory={selectedCategory}
              onSelectEntry={handleEntrySelect}
            />
          )}
        </div>

        {/* Vault Display */}
        <div className="dark:bg-display-dark bg-display-light p-4 h-full overflow-y-auto">
          {showAddPassword ? (
            <AddPassword /> // Show the AddPassword form if adding a new entry
          ) : (
            <VaultDisplay
              service={selectedEntry?.serviceName}
              username={selectedEntry?.username}
              password={selectedEntry?.password}
              Icon={selectedEntry?.Icon}
              onDelete={handleDelete} // Pass handleDelete
              onEdit={handleEdit} // Pass handleEdit
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
