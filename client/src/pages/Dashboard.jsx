import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import VaultEntries from "../components/VaultEntries";
import VaultDisplay from "../components/VaultDisplay";
import AddEntry from "../components/AddEntry";

const apiURL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entries, setEntries] = useState([]);
  const [showAddEntry, setShowAddEntry] = useState(false);
  const [visibleSection, setVisibleSection] = useState("sidebar");
  const { searchQuery } = useOutletContext() || {};
  const addEntryButtonRef = useRef(null); // Ref for the "Add New Entry" button

  // Fetch entries from API
  const fetchEntries = async () => {
    try {
      const response = await fetch(`${apiURL}/api/locker`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setEntries(data);
      } else {
        console.error("Failed to fetch entries");
      }
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Filtered entries logic
  const filteredEntries = entries.filter((entry) => {
    if (!entry) return false;
    const query = searchQuery?.toLowerCase() || "";
    const matchesSearch =
      query &&
      (entry.serviceName?.toLowerCase().includes(query) ||
        entry.label?.toLowerCase().includes(query) ||
        entry.username?.toLowerCase().includes(query));

    const matchesCategory =
      selectedCategory === "All"
        ? entry.category !== "Deleted"
        : selectedCategory === entry.category;

    return query ? matchesSearch : matchesCategory;
  });

  // Handlers for section visibility
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setVisibleSection("vaultEntries");
  };

  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry);
    setVisibleSection("vaultDisplay");
  };

  const handleAddNewEntry = () => {
    setShowAddEntry(true);
    setVisibleSection("vaultDisplay");
  };

  const handleCloseAddEntry = async () => {
    setShowAddEntry(false);

    // Refresh the entries after adding a new entry
    await fetchEntries();

    // Focus the "Add New Entry" button
    if (addEntryButtonRef.current) {
      addEntryButtonRef.current.focus();
    }
  };

  const handleBackToSidebar = () => {
    setVisibleSection("sidebar");
    setSelectedEntry(null);
    setShowAddEntry(false);
  };

  const handleBackToEntries = () => {
    setVisibleSection("vaultEntries");
    setSelectedEntry(null);
    setShowAddEntry(false);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="h-full grid md:grid-cols-[380px_1fr_2fr]">
        {/* Sidebar */}
        <div
          className={`h-full ${
            visibleSection === "sidebar" ? "block" : "hidden"
          } md:block md:w-[380px] dark:bg-sidebar-dark bg-sidebar-light`}
        >
          <Sidebar
            onSelectCategory={handleCategorySelect}
            onAddNewEntry={handleAddNewEntry}
            addEntryButtonRef={addEntryButtonRef} // Pass ref to Sidebar
          />
        </div>

        {/* Vault Entries */}
        <div
          className={`h-full ${
            visibleSection === "vaultEntries" ? "block" : "hidden"
          } md:block dark:bg-vault-dark bg-vault-light p-4 overflow-y-auto`}
        >
          {visibleSection === "vaultEntries" && (
            <button
              onClick={handleBackToSidebar}
              className="text-sm dark:text-highlight-dark text-highlight-light mb-4 md:hidden"
            >
              &larr; Back to Categories
            </button>
          )}
          {filteredEntries.length > 0 && (
            <VaultEntries
              entries={filteredEntries}
              selectedCategory={selectedCategory}
              onSelectEntry={handleEntrySelect}
              searchQuery={searchQuery}
            />
          )}
        </div>

        {/* Vault Display */}
        <div
          className={`h-full ${
            visibleSection === "vaultDisplay" ? "block" : "hidden"
          } md:block dark:bg-display-dark bg-display-light p-5 overflow-y-auto`}
        >
          {visibleSection === "vaultDisplay" && (
            <button
              onClick={handleBackToEntries}
              className="text-sm dark:text-highlight-dark text-highlight-light mb-4 md:hidden"
            >
              &larr; Back to Entries
            </button>
          )}
          {showAddEntry ? (
            <AddEntry
              onClose={handleCloseAddEntry} // Refresh entries when form closes
              onAddEntry={fetchEntries} // Optional: Directly fetch entries after adding
            />
          ) : (
            <VaultDisplay
              service={selectedEntry?.serviceName}
              username={selectedEntry?.username}
              label={selectedEntry?.label}
              password={selectedEntry?.password}
              Icon={selectedEntry?.Icon}
              entryId={selectedEntry?._id}
              setEntries={setEntries}
              setSelectedEntry={setSelectedEntry}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
