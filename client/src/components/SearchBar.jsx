import { useState } from "react";
import { PiMagnifyingGlassDuotone, PiEraserFill } from "react-icons/pi";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");

  const handleClear = () => {
    setSearchValue("");
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      console.log("Search for:", searchValue); // Placeholder for actual search logic
      // Example placeholder action
      alert(`You searched for: ${searchValue}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full max-w-md">
        <label htmlFor="search" className="sr-only">Search</label>
        <div className="relative">
          {/* Search Input */}
          <input
            id="search"
            name="search"
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown} // Handle Enter key press
            className="block w-full rounded-[4px] border-solid border-2 border-display-dark dark:border-display-light py-1.5 px-3 pl-8 text-gray-700 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm"
          />

          {/* Search Icon Button */}
          <button
            type="button"
            onClick={handleSearch} // Trigger search on icon click
            className="absolute inset-y-0 left-2 flex items-center"
          >
            <PiMagnifyingGlassDuotone size={20} className="dark:text-title-dark text-title-light" />
          </button>

          {/* Clear Search Button */}
          {searchValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-3 flex items-center"
            >
              <PiEraserFill size={20} className="dark:text-title-dark text-title-light" />
            </button>
          )}
        </div>
      </div>

      {/* Placeholder for search results */}
      {searchValue && (
        <div className="mt-4 text-gray-700">
          <p>Searching for: <strong>{searchValue}</strong></p>
          {/* Later, replace this with actual search results */}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
