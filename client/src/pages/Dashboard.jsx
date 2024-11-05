import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import VaultEntries from '../components/VaultEntries';
import VaultDisplay from '../components/VaultDisplay';

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry);
  };

  return (
    <div className="h-full grid grid-cols-[300px_1fr_2fr] p-4 gap-4">
      {/* Sidebar Section */}
      <div className="bg-sidebar-light dark:bg-sidebar-dark border-solid border-2 border-display-dark dark:border-display-light rounded-[4px] h-full overflow-y-auto">
        <Sidebar onSelectCategory={handleCategorySelect} />
      </div>

      {/* Vault Entries Section */}
      <div className="dark:bg-vault-dark bg-vault-light border-solid border-2 border-display-dark dark:border-display-light p-4 rounded-[4px] h-full overflow-y-auto">
        <VaultEntries onSelectEntry={handleEntrySelect} selectedCategory={selectedCategory} />
      </div>

      {/* Entry Display Section */}
      <div className="dark:bg-display-dark bg-display-light border-solid border-2 border-display-dark dark:border-display-light p-4 rounded-[4px] h-full overflow-y-auto">
        {selectedEntry && (
          <VaultDisplay
          service={selectedEntry.serviceName}
          username={selectedEntry.username}
          password={selectedEntry.password}
          Icon={selectedEntry.Icon} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
