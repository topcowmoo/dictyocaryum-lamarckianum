import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import VaultEntries from "../components/VaultEntries";
import VaultDisplay from "../components/VaultDisplay";

const apiURL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const [currentView, setCurrentView] = useState("sidebar"); // Tracks current view for small screens
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entries, setEntries] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Fetch entries from API
  useEffect(() => {
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

    fetchEntries();
  }, []);

  // Detect screen size for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640); // Tailwind's `sm` breakpoint is 640px
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter entries based on category
  const filteredEntries = entries.filter((entry) => {
    if (!entry) return false;

    if (selectedCategory === "All") {
      return entry.category !== "Deleted";
    }

    if (selectedCategory === "Deleted") {
      return entry.category === "Deleted";
    }

    return entry.category === selectedCategory;
  });

  // Handlers for small screens
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentView("entries");
  };

  const handleEntrySelect = (entry) => {
    setSelectedEntry(entry);
    setCurrentView("modal");
  };

  const handleBack = () => {
    if (currentView === "modal") {
      setCurrentView("entries");
    } else if (currentView === "entries") {
      setCurrentView("sidebar");
    }
  };

  // Layout for small screens
  if (isSmallScreen) {
    return (
      <div className="h-screen w-full bg-gray-100">
        {/* Sidebar View */}
        {currentView === "sidebar" && (
          <div className="h-full">
            <Sidebar
              onSelectCategory={handleCategorySelect}
              className="h-full"
            />
          </div>
        )}

        {/* Entries View */}
        {currentView === "entries" && (
          <div className="h-full">
            <button
              className="p-2 text-gray-600 hover:text-gray-900"
              onClick={handleBack}
            >
              Back
            </button>
            <VaultEntries
              entries={filteredEntries}
              selectedCategory={selectedCategory}
              onSelectEntry={handleEntrySelect}
            />
          </div>
        )}

        {/* Modal View */}
        {currentView === "modal" && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 w-11/12 max-w-md rounded-lg shadow-lg">
              <button
                className="p-2 text-gray-600 hover:text-gray-900 mb-4"
                onClick={handleBack}
              >
                Close
              </button>
              {selectedEntry && (
                <VaultDisplay
                  service={selectedEntry?.serviceName}
                  username={selectedEntry?.username}
                  label={selectedEntry?.label}
                  password={selectedEntry?.password}
                  Icon={selectedEntry?.Icon}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Original layout for larger screens
  return (
    <div className="h-full flex flex-col">
      <div className="h-full grid grid-cols-[300px_1fr_2fr]">
        {/* Sidebar */}
        <Sidebar
          onSelectCategory={setSelectedCategory}
          onAddNewEntry={() => setSelectedEntry(null)}
        />

        {/* Vault Entries Section */}
        <div className="dark:bg-vault-dark bg-vault-light p-4 h-full overflow-y-auto">
          {filteredEntries.length > 0 && (
            <VaultEntries
              entries={filteredEntries}
              selectedCategory={selectedCategory}
              onSelectEntry={setSelectedEntry}
            />
          )}
        </div>

        {/* Vault Display Section */}
        <div className="dark:bg-display-dark bg-display-light p-4 h-full overflow-y-auto">
          {selectedEntry ? (
            <VaultDisplay
              service={selectedEntry?.serviceName}
              username={selectedEntry?.username}
              label={selectedEntry?.label}
              password={selectedEntry?.password}
              Icon={selectedEntry?.Icon}
              onDelete={(id) =>
                setEntries((prev) => prev.filter((entry) => entry._id !== id))
              }
              onEdit={(updatedEntry) =>
                setEntries((prev) =>
                  prev.map((entry) =>
                    entry._id === updatedEntry._id ? updatedEntry : entry
                  )
                )
              }
            />
          ) : (
            <div>Select an entry to view its details</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
