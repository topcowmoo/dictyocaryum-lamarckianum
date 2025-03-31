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
  const [selectedSidebarItem, setSelectedSidebarItem] = useState("All");

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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSidebarItem(category);
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
    setSelectedSidebarItem("New");
    setVisibleSection("vaultDisplay");
  };

  const handleCloseAddEntry = () => {
    setShowAddEntry(false);
    setVisibleSection("vaultEntries");
    setSelectedCategory("All");
    setSelectedEntry(null);
    fetchEntries();
    setSelectedSidebarItem("All");
  };

  const handleDelete = async (entryId) => {
    try {
      const response = await fetch(`${apiURL}/api/locker/${entryId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: "Deleted" }),
      });
      if (response.ok) {
        setEntries((prev) =>
          prev.map((entry) =>
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
    setEntries((prev) =>
      prev.map((entry) =>
        entry._id === updatedEntry._id ? updatedEntry : entry
      )
    );
    setSelectedEntry(null);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-y-auto">

      {/* ✅ Tab Navigation (md and below) */}
      <div className="lg:hidden flex justify-around border-b border-gray-300 dark:border-gray-600 bg-sidebar-light dark:bg-sidebar-dark">
        <button
          className={`flex-1 py-3 text-sm ${
            visibleSection === "sidebar"
              ? "border-b-2 border-highlight-light dark:border-highlight-dark text-alltext-light dark:text-alltext-dark"
              : "text-gray-500 dark:text-gray-400"
          }`}
          onClick={() => setVisibleSection("sidebar")}
        >
          Categories
        </button>
        <button
          className={`flex-1 py-3 text-sm ${
            visibleSection === "vaultEntries"
              ? "border-b-2 border-highlight-light dark:border-highlight-dark font-semibold"
              : "text-alltext-light dark:text-alltext-dark"
          }`}
          onClick={() => setVisibleSection("vaultEntries")}
        >
          Entries
        </button>
        <button
          className={`flex-1 py-3 text-sm ${
            visibleSection === "vaultDisplay"
              ? "border-b-2 border-highlight-light dark:border-highlight-dark font-semibold"
              : "text-alltext-light dark:text-alltext-dark"
          }`}
          onClick={() => setVisibleSection("vaultDisplay")}
        >
          Display
        </button>
      </div>

      {/* ✅ Main Layout: lg and up use grid */}
      <div className="h-full lg:grid lg:grid-cols-[365px_1.2fr_1.8fr]">
        {/* Sidebar */}
        <div
          className={`h-full ${
            visibleSection === "sidebar" ? "block" : "hidden"
          } lg:block dark:bg-sidebar-dark bg-sidebar-light`}
        >
          <Sidebar
            onSelectCategory={handleCategorySelect}
            onAddNewEntry={handleAddNewEntry}
            addEntryButtonRef={addEntryButtonRef}
            selectedItem={selectedSidebarItem}
          />
        </div>

        {/* Vault Entries */}
        <div
          className={`h-full ${
            visibleSection === "vaultEntries" ? "block" : "hidden"
          } lg:block dark:bg-vault-dark bg-vault-light p-4 overflow-y-auto`}
        >
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
          } lg:block dark:bg-display-dark bg-display-light p-5 overflow-y-auto`}
        >
          {showAddEntry ? (
            <AddEntry onClose={handleCloseAddEntry} onAddEntry={fetchEntries} />
          ) : (
            <VaultDisplay
              username={selectedEntry?.username}
              name={selectedEntry?.name}
              password={selectedEntry?.password}
              entryId={selectedEntry?._id}
              setEntries={setEntries}
              setSelectedEntry={setSelectedEntry}
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