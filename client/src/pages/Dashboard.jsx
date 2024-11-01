import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import VaultEntries from '../components/VaultEntries';
import EntryDisplay from '../components/EntryDisplay';

function Dashboard() {
  // State to track the selected category from Sidebar
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEntry, setSelectedEntry] = useState(null);

  // Function to handle category selection from Sidebar
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Function to handle entry selection in VaultEntries
  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry);
  };

  return (
    <div className="min-h-screen grid grid-cols-[300px_1fr_2fr] p-4 gap-4">
      {/* Sidebar Section */}
      <div className="bg-sidebar-light dark:bg-sidebar-dark rounded-[4px]">
        <Sidebar onSelectCategory={handleCategorySelect} />
      </div>

      {/* Vault Entries Section */}
      <div className="dark:bg-vault-dark bg-vault-light p-4 rounded-[4px] overflow-y-auto">
        <VaultEntries 
          selectedCategory={selectedCategory} 
          onSelectEntry={handleEntrySelect} 
        />
      </div>

      {/* Entry Display Section */}
      <div className="dark:bg-display-dark bg-display-light p-4 rounded-[4px]">
        <EntryDisplay entry={selectedEntry} />
      </div>
    </div>
  );
}

export default Dashboard;
