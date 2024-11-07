import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom'; // Import useOutletContext
import Sidebar from '../components/Sidebar';
import VaultEntries from '../components/VaultEntries';
import VaultDisplay from '../components/VaultDisplay';

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entries, setEntries] = useState([]); // Start with no entries

  // Access searchQuery from Outlet context
  const { searchQuery } = useOutletContext();

  useEffect(() => {
    // Fetch entries only if a category is selected
    if (!selectedCategory) return;

    const fetchEntries = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/locker?category=${selectedCategory}`, {
          method: "GET",
          credentials: "include", // Include cookies for authentication
        });

        if (response.ok) {
          const data = await response.json();
          setEntries(data);
        } else {
          console.error("Failed to fetch entries:", response.statusText);
          setEntries([]); // Clear entries if fetching fails
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
        setEntries([]);
      }
    };

    fetchEntries();
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedEntry(null); // Clear the selected entry when the category changes
    setEntries([]); // Clear current entries until new ones are loaded
  };

  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry); // Set the selected entry
  };

  // Filter entries based on the search query
  const filteredEntries = entries.filter((entry) =>
    entry.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Main Content */}
      <div className="h-full grid grid-cols-[300px_1fr_2fr] p-4 gap-4">
        <Sidebar onSelectCategory={handleCategorySelect} />

        <div className="dark:bg-vault-dark bg-vault-light border-solid border-2 border-display-dark dark:border-display-light p-4 rounded-[4px] h-full overflow-y-auto">
          {selectedCategory && ( // Only render VaultEntries if a category is selected
            <VaultEntries
              entries={filteredEntries} // Use the filtered entries
              selectedCategory={selectedCategory}
              onSelectEntry={handleEntrySelect}
            />
          )}
        </div>

        <div className="dark:bg-display-dark bg-display-light border-solid border-2 border-display-dark dark:border-display-light p-4 rounded-[4px] h-full overflow-y-auto">
          <VaultDisplay
            service={selectedEntry?.serviceName}
            username={selectedEntry?.username}
            password={selectedEntry?.password}
            Icon={selectedEntry?.Icon}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
