import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../DataProvider";

export default function LocationLookAhead() {
  const { venues } = useContext(DataContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchableLocations, setSearchableLocations] = useState([]);

  useEffect(() => {
    if (venues && venues.length > 0) {
      const locationsSet = new Set(venues.map((venue) => venue.location.city).filter((city) => city));
      const locationsArr = Array.from(locationsSet);
      setSearchableLocations(locationsArr);
    }
    console.log("searchableLocations", searchableLocations);
  }, [venues]);

  const searchResult = searchableLocations.filter((location) => location.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <form id="searchForm">
        <input id="searchInput" type="search" placeholder="Search..." aria-label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.trim())} />
        <button value="search button" id="searchButton" type="submit" aria-label="Search">
          {/* <img src={SearchIcon} alt="Search icon" /> */}
        </button>
      </form>
      {searchableLocations && searchQuery.length > 0 && (
        <ul>
          {searchResult
            .filter((location) => searchQuery.toLowerCase() !== location.toLowerCase())
            .map((location) => (
              <li key={location} onClick={() => setSearchQuery(location)}>
                {location}
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
