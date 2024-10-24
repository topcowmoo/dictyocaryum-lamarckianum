import { PiMagnifyingGlassDuotone } from "react-icons/pi";

function SearchBar() {
  return (
    <div className="flex justify-center items center">
      <div className="w-full h-full">
        <label htmlFor="search" className="sr-only">Search</label>
        <div className="relative">
          <div className="relative flex items-end pointer-events-auto">
        <input
                  id="search"
                  name="search"
                  type="search"
                  placeholder="Search..."
                  onClick={() => console.log("Search")}
                  className="block w-full rounded-[10px] border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                />
          </div>
          <PiMagnifyingGlassDuotone />
</div>
      </div>
      
</div>
  )
}

export default SearchBar