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
  const addEntryButtonRef = useRef(null);

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
      (entry.name?.toLowerCase().includes(query) ||
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
    setSelectedEntry(null);
    setShowAddEntry(false);
    setVisibleSection("vaultEntries");
  };

  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry);
    setShowAddEntry(false);
    setVisibleSection("vaultDisplay");
  };
  
  const handleAddNewEntry = () => {
    setSelectedEntry(null);
    setShowAddEntry(true);
    setVisibleSection("vaultDisplay");
  };  

  const handleCloseAddEntry = () => {
    setShowAddEntry(false);

    // Focus the "Add New Entry" button after closing
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

  const handleDelete = async (entryId) => {
    try {
      const response = await fetch(`${apiURL}/api/locker/${entryId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category: "Deleted" }),
      });
  
      if (response.ok) {
        setEntries((prevEntries) =>
          prevEntries.map((entry) =>
            entry._id === entryId ? { ...entry, category: "Deleted" } : entry
          )
        );
        setSelectedEntry(null);
      } else {
        alert("Failed to delete entry");
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleEditSubmit = (updatedEntry) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry._id === updatedEntry._id ? updatedEntry : entry
      )
    );
    setSelectedEntry(null);
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
            addEntryButtonRef={addEntryButtonRef}
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
              onClose={handleCloseAddEntry}
              onAddEntry={fetchEntries}
            />
          ) : (
            <VaultDisplay
              username={selectedEntry?.username}
              name={selectedEntry?.name}
              password={selectedEntry?.password}
              entryId={selectedEntry?._id}
              setEntries={setEntries}              setSelectedEntry={setSelectedEntry}
              category={selectedEntry?.category}
              onDelete={() => handleDelete(selectedEntry?._id)}
              onEdit={handleEditSubmit}
              entries={entries}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
