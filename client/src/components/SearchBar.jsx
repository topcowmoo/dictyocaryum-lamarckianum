import { PiMagnifyingGlassDuotone } from "react-icons/pi";

function SearchBar() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-md">
        <label htmlFor="search" className="sr-only">Search</label>
        <div className="relative">
          

          {/* Search Input */}
          <input
            id="search"
            name="search"
            type="search"
            placeholder="Search..."
            onClick={() => console.log("Search")}
            className="block w-full rounded-[10px] border-0 bg-orange-200 py-1.5 px-3 text-gray-700 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
          />
          {/* Search Icon */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <PiMagnifyingGlassDuotone size={20} className="text-gray-400" />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default SearchBar;
