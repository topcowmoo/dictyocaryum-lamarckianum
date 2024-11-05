import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import VaultEntries from '../components/VaultEntries';
import VaultDisplay from '../components/VaultDisplay';

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null); // Holds selected entry details
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  const { searchQuery } = useOutletContext();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/locker');
        if (!response.ok) throw new Error('Failed to fetch entries');
        const data = await response.json();
        setEntries(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchEntries();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedEntry(null); // Clear selected entry when category changes
  };

  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry); // Set selected entry with full entry details
  };

  return (
    <div className="h-full grid grid-cols-[300px_1fr_2fr] p-4 gap-4">
      <Sidebar onSelectCategory={handleCategorySelect} />

      <div className="dark:bg-vault-dark bg-vault-light border-solid border-2 border-display-dark dark:border-display-light p-4 rounded-[4px] h-full overflow-y-auto">
        {error ? <p>Error: {error}</p> : null}
        <VaultEntries
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          entries={entries}
          onSelectEntry={handleEntrySelect} // Pass selected entry to VaultDisplay
        />
      </div>

      {/* Pass entry details directly to VaultDisplay */}
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
