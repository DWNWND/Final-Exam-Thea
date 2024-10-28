import useFetch from "../../hooks/useFetch.jsx";
import { useState, useEffect } from "react";
// import { Outlet } from "react-router-dom";
import { createContext } from "react";

const page = 1;
const limit = 10;
// ?page=${page}&limit=${limit}

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const sortedByRating = `${apiBaseUrl}?sort=created&sortOrder=desc`;

export const DataContext = createContext();

export function DataProvider({ children }) {
  const { data, isLoading, isError } = useFetch(`${sortedByRating}`);
  const [venues, setVenues] = useState([]);
  const allVenuesArr = data.data;
  // const location = useLocation();
  // const page = location.pathname;

  //fetched all venues from the API and filter out the ones with missing location data, so that the search results will be accurate. Would wish that this was already fixed by the api, so that i could fetch it by page ang with a page limit, and not fetch all.
  useEffect(() => {
    if (allVenuesArr && allVenuesArr.length >= 0) {
      const filteredOutMissingLocations = allVenuesArr.filter((venue) => {
        return venue.location.city && venue.location.country;
      });
      console.log("filteredOutMissingLocations", filteredOutMissingLocations);
      setVenues(filteredOutMissingLocations);
    }
  }, [data, allVenuesArr]);

  return <DataContext.Provider value={{ venues, setVenues, isLoading, isError }}>{children}</DataContext.Provider>;
}
