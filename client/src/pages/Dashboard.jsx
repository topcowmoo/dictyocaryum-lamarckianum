import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import VaultEntries from '../components/VaultEntries';
import VaultDisplay from '../components/VaultDisplay';

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null); // Default to "All" for initial display
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { searchQuery } = useOutletContext(); // Get searchQuery from context

  useEffect(() => {
    const fetchEntries = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/locker');
        if (!response.ok) throw new Error('Failed to fetch entries');
        const data = await response.json();
        setEntries(data); // Store entries fetched from the server
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
    setSelectedEntry(null);
  };

  return (
    <div className="h-full grid grid-cols-[300px_1fr_2fr] p-4 gap-4">
      <Sidebar onSelectCategory={handleCategorySelect} />

      <div className="dark:bg-vault-dark bg-vault-light border-solid border-2 border-display-dark dark:border-display-light p-4 rounded-[4px] h-full overflow-y-auto">
        {loading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : null}
        <VaultEntries
          selectedCategory={selectedCategory}
          searchQuery={searchQuery} // Pass searchQuery to VaultEntries for filtering
          entries={entries}
          onSelectEntry={(entry) => setSelectedEntry(entry)}
        />
      </div>

      {selectedEntry && (
        <div className="dark:bg-display-dark bg-display-light border-solid border-2 border-display-dark dark:border-display-light p-4 rounded-[4px] h-full overflow-y-auto">
          <VaultDisplay
            service={selectedEntry.serviceName}
            username={selectedEntry.username}
            password={selectedEntry.password}
            Icon={selectedEntry.Icon}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
