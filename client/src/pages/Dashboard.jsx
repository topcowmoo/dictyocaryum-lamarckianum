import Sidebar from '../components/Sidebar';
import VaultEntries from '../components/VaultEntries';
import EntryDisplay from '../components/EntryDisplay';

function Dashboard() {
  return (
    <div className="min-h-screen grid grid-cols-[300px_1fr_2fr] gap-4 p-6 bg-bgc-light dark:bg-bgc-dark">
      {/* Sidebar Section */}
      <div className="bg-sidebar-light dark:bg-sidebar-dark p-4 rounded-lg">
        <Sidebar />
      </div>

      {/* Vault Entries Section */}
      <div className="dark:bg-vault-dark bg-vault-light p-4 rounded-lg overflow-y-auto">
        <VaultEntries />
      </div>

      {/* Entry Display Section */}
      <div className=" dark:bg-display-dark bg-display-light p-4 rounded-lg">
        <EntryDisplay />
      </div>
    </div>
  );
}

export default Dashboard;
