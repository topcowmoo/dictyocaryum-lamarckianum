import { useState } from "react";
import PropTypes from "prop-types";
import { PiMagnifyingGlassDuotone, PiEraserFill } from "react-icons/pi";

function SearchBar({ onSearchChange }) {
  const [searchValue, setSearchValue] = useState("");

  const handleClear = () => {
    setSearchValue("");
    onSearchChange(""); // Clear the search query
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange(value); // Pass the search value up to Dashboard
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        id="search"
        name="search"
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchChange} // Update search on every keystroke
        className="block w-full rounded-[4px] border-solid border-2 border-display-dark dark:border-display-light py-1.5 px-3 pl-10 text-gray-700 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm"
      />
      
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <PiMagnifyingGlassDuotone size={20} className="dark:text-title-dark text-title-light" />
      </div>

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
  );
}

SearchBar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default SearchBar;
