import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import VaultEntries from '../components/VaultEntries';
import VaultDisplay from '../components/VaultDisplay';

function Dashboard() {
  // Initialize state with localStorage values if they exist
  const [selectedCategory, setSelectedCategory] = useState(
    localStorage.getItem("selectedCategory") || null
  );
  const [selectedEntry, setSelectedEntry] = useState(
    JSON.parse(localStorage.getItem("selectedEntry")) || null
  );
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || ""
  );

  useEffect(() => {
    // Load initial state from localStorage if not already set
    const savedCategory = localStorage.getItem("selectedCategory");
    const savedEntry = localStorage.getItem("selectedEntry");
    const savedSearch = localStorage.getItem("searchQuery");

    if (savedCategory) setSelectedCategory(savedCategory);
    if (savedEntry) setSelectedEntry(JSON.parse(savedEntry));
    if (savedSearch) setSearchQuery(savedSearch);
  }, []);

  useEffect(() => {
    // Update localStorage whenever these state values change
    if (selectedCategory) localStorage.setItem("selectedCategory", selectedCategory);
    if (selectedEntry) localStorage.setItem("selectedEntry", JSON.stringify(selectedEntry));
    if (searchQuery) localStorage.setItem("searchQuery", searchQuery);
  }, [selectedCategory, selectedEntry, searchQuery]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedEntry(null); // Clear selected entry when category changes
  };

  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry); // Set selected entry
  };

  return (
    <div className="h-full grid grid-cols-[300px_1fr_2fr] p-4 gap-4">
      <Sidebar onSelectCategory={handleCategorySelect} />

      <div className="dark:bg-vault-dark bg-vault-light border-solid border-2 border-display-dark dark:border-display-light p-4 rounded-[4px] h-full overflow-y-auto">
        <VaultEntries
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectEntry={handleEntrySelect}
        />
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
  );
}

export default Dashboard;
