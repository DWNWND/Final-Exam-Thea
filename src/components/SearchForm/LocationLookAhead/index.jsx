import { useState, useContext, useEffect } from "react";
import { DataContext } from "../../DataProvider";

export default function LocationLookAhead() {
  const { venues } = useContext(DataContext);

  const [searchQuery, setSearchQuery] = useState("");

  let filteredLocations = [];

  if (venues && venues.length > 0) {

  const validCities = venues.filter((venue) => venue.location.city);
  const uniqCities = [...new Map(validCities.map((venue) => [venue.location.city.toLowerCase(), venue])).values()];

    filteredLocations = uniqCities.filter((venue) => venue.location.city.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  console.log("uniq cities", filteredLocations);

  return (
    <>
      <form id="searchForm">
        <input id="searchInput" type="search" placeholder="Search..." aria-label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value.trim())} />
        <button value="search button" id="searchButton" type="submit" aria-label="Search">
          {/* <img src={SearchIcon} alt="Search icon" /> */}
        </button>
      </form>
      {filteredLocations.length > 0 && searchQuery.length > 0 && (
        <ul>
          {filteredLocations.map((venue) => {
            return (
              <>
                {searchQuery !== venue.location.city && (
                  <li key={venue.id} onClick={() => setSearchQuery(venue.location.city)}>
                    {venue.location.city}
                  </li>
                )}
              </>
            );
          })}
        </ul>
      )}
    </>
  );
}
