import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { useTravelSearchStore } from "../../../../../stores";
import { searchableLocations } from "../../../../../assets/locations/searchableLocations";

interface LocationLookAheadProps {
  color: string;
}

export function LocationLookAhead({ color }: LocationLookAheadProps): JSX.Element {
  const { setLocation, travelSearchData } = useTravelSearchStore();
  const [searchQuery, setSearchQuery] = useState<string>(travelSearchData.location || "");
  const [locationListOpen, setLocationListOpen] = useState<boolean>(false);

  useEffect(() => {
    setSearchQuery(travelSearchData.location || "");
  }, [travelSearchData.location]);

  const searchResult = searchableLocations.filter((location: string) => location.toLowerCase().trim().includes(searchQuery.toLowerCase().trim()));

  return (
    <div className="relative w-full flex">
      <div className={`flex justify-between items-center rounded-full border-${color} border px-3 bg-white w-full`}>
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
            setLocationListOpen(true);
            const value = e.target.value;
            setLocation(value);
            setSearchQuery(value);
          }}
        />
        <IoIosSearch className={`text-2xl text-${color}`} />
      </div>
      {locationListOpen && searchQuery.length > 0 && (
        <div className={`bg-white border border-${color} shadow-md rounded-md absolute top-12 w-full p-4 z-40`}>
          <p className={`italic text-${color} mb-2`}>Please select a location from the list below:</p>
          <div className="line"></div>
          <ul className="bg-white">
            {searchResult.length > 0 ? (
              searchResult.map((location: string) => (
                <li
                  className={`hover:font-semibold p-2 cursor-pointer text-${color}`}
                  key={location}
                  onClick={() => {
                    setSearchQuery(location);
                    setLocation(location);
                    setLocationListOpen(false);
                  }}>
                  {location}
                </li>
              ))
            ) : (
              <li className={`p-2 text-${color}`} onClick={() => setSearchQuery("")}>
                No location matching &quot;{searchQuery}&quot; found.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
