import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { useSearchStore } from "../../../../stores/useSearchStore.js";
import { searchableLocations } from "../../../../assets/locations/searchableLocations.js";

export default function LocationLookAhead({ color }) {
  const { setLocation, travelSearchData } = useSearchStore();
  const [searchQuery, setSearchQuery] = useState(travelSearchData.location || "");

  useEffect(() => {
    setSearchQuery(travelSearchData.location || "");
  }, [travelSearchData.location]);

  const searchResult = searchableLocations.filter((location) => location.toLowerCase().includes(searchQuery.toLowerCase()));
  const searchQueryAndResultMatches = searchableLocations.some((location) => location.toLowerCase() === searchQuery.toLowerCase());

  return (
    <div className="relative w-full flex">
      <div className={`flex justify-between items-center rounded-full border-${color} border px-3  bg-white w-full`}>
        <input
          required
          autoComplete="off"
          className={`p-2 bg-transparent w-full placeholder:font-normal placeholder:italic font-semibold text-${color} placeholder:text-${color}`}
          value={searchQuery}
          id="searchInput"
          type="search"
          placeholder="Where do you want to go?"
          aria-label="Search by City"
          onChange={(e) => {
            setLocation(e.target.value.trim());
            setSearchQuery(e.target.value.trim());
          }}
        />
        <IoIosSearch className={`text-2xl text-${color}`} />
      </div>
      {searchQuery.length > 0 && (
        <div className={`${!searchQueryAndResultMatches && `bg-white border border-${color} shadow-md`} rounded-md absolute top-12 w-full p-4 z-40`}>
          {!searchQueryAndResultMatches && (
            <>
              <p className={`italic text-${color} mb-2`}>Please select a location from the list below:</p>
              <div className="line"></div>
            </>
          )}
          <ul className="bg-white">
            {searchResult && searchResult.length > 0 ? (
              <>
                {searchResult
                  .filter((location) => searchQuery.toLowerCase() !== location.toLowerCase())
                  .map((location) => (
                    <li
                      className={`hover:font-semibold p-2 cursor-pointer text-${color}`}
                      key={location}
                      onClick={() => {
                        setSearchQuery(location);
                        // setSearchQuery("");
                        setLocation(location);
                      }}>
                      {location}
                    </li>
                  ))}
              </>
            ) : (
              <li className={`hover:font-semibold p-2 cursor-pointer text-${color}`} onClick={() => setSearchQuery("")}>
                No location matching "{searchQuery}" found.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
