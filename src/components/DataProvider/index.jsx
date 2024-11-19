import useFetch from "../../hooks/useFetch.jsx";
import { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import { createContext } from "react";
import { DataContext } from "../../contexts/index.jsx";
import { searchableLocations } from "../../assets/locations/searchableLocations.js";
import { capitalizeWords } from "../../utils/capWords/capitalizeWords.js";
// const page = 1;
// const limit = 10;
// ?page=${page}&limit=${limit}

const apiVenuesUrl = import.meta.env.VITE_API_VENUES_URL;
const sortedByRating = `${apiVenuesUrl}?sort=created&sortOrder=desc`;

export function DataProvider({ children }) {
  const { data, loading, setLoading, error } = useFetch(`${sortedByRating}`);
  const [venues, setVenues] = useState([]);
  const allVenuesArr = data.data;
  // const location = useLocation();
  // const page = location.pathname;

  //fetched all venues from the API and filter out the ones with missing location data, so that the search results will be accurate. Would wish that this was already fixed by the api, so that i could fetch it by page ang with a page limit, and not fetch all.
  useEffect(() => {
    setLoading(true);
    if (allVenuesArr && allVenuesArr.length >= 0) {
      const filteredOutMissingLocations = allVenuesArr.filter((venue) => {
        return venue.location.city && venue.location.country;
      });

      filteredOutMissingLocations.forEach((venue) => {
        if (venue.location && venue.location.city) {
          const capitalizedCity = capitalizeWords(venue.location.city); // Capitalize the city
          if (!searchableLocations.includes(capitalizedCity)) {
            searchableLocations.push(capitalizedCity); // Add if not already in the array
          }
        }
      });
      setVenues(filteredOutMissingLocations);
      setLoading(false);
    }
  }, [data, allVenuesArr]);

  return <DataContext.Provider value={{ venues, setVenues, loading, error }}>{children}</DataContext.Provider>;
}
