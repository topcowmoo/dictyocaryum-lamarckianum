import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import VaultEntries from '../components/VaultEntries';
import VaultDisplay from '../components/VaultDisplay';

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entries, setEntries] = useState([]);

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
  };

  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry);
  };

  const filteredEntries = entries.filter((entry) =>
    entry.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      {/* Main Content */}
      <div className="h-full grid grid-cols-[300px_1fr_2fr]">
        {/* Sidebar */}
        <div className="p-4 bg-red-400 h-full flex flex-col justify-start gap-4">
          <Sidebar onSelectCategory={handleCategorySelect} />
        </div>

        {/* Vault Entries */}
        <div className="dark:bg-vault-dark bg-blue-100 p-4 h-full overflow-y-auto">
          {selectedCategory && (
            <VaultEntries
              entries={filteredEntries}
              selectedCategory={selectedCategory}
              onSelectEntry={handleEntrySelect}
            />
          )}
        </div>

        {/* Vault Display */}
        <div className="dark:bg-display-dark bg-orange-100 p-4 h-full overflow-y-auto">
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
