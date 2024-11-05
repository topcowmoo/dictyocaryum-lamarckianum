import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import VaultEntries from '../components/VaultEntries';
import VaultDisplay from '../components/VaultDisplay';

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null); // Start with no category selected
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/locker');
        if (!response.ok) throw new Error('Failed to fetch entries');
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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedEntry(null); // Clear selected entry when category changes
  };

  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="h-full grid grid-cols-[300px_1fr_2fr] p-4 gap-4">
      {/* Sidebar Section */}
      <div className="bg-sidebar-light dark:bg-sidebar-dark border-solid border-2 border-display-dark dark:border-display-light rounded-[4px] h-full overflow-y-auto">
        <Sidebar onSelectCategory={handleCategorySelect} />
      </div>

      {/* Vault Entries Section */}
      <div className="dark:bg-vault-dark bg-vault-light border-solid border-2 border-display-dark dark:border-display-light p-4 rounded-[4px] h-full overflow-y-auto">
        {selectedCategory && (
          <VaultEntries
            selectedCategory={selectedCategory}
            entries={entries}
            onSelectEntry={handleEntrySelect}
          />
        )}
      </div>

      {/* Entry Display Section */}
      <div className="dark:bg-display-dark bg-display-light border-solid border-2 border-display-dark dark:border-display-light p-4 rounded-[4px] h-full overflow-y-auto">
        {selectedEntry && (
          <VaultDisplay
            service={selectedEntry.serviceName}
            username={selectedEntry.username}
            password={selectedEntry.password}
            Icon={selectedEntry.Icon}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
