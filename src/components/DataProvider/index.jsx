import useFetch from "../../hooks/useFetch.jsx";
import { useState, useEffect } from "react";
import { DataContext } from "../../contexts/index.jsx";
import { searchableLocations } from "../../assets/locations/searchableLocations.js";
import { capitalizeWords } from "../../utils/";

export function DataProvider({ children }) {
  const { data, loading, setLoading, error, fetchFromApi } = useFetch();
  const [allListingsArr, setAllListingsArr] = useState([]);
  const [displayedListings, setDisplayedListings] = useState([]);
  const [mainErrorMessage, setMainErrorMessage] = useState(""); // the errormessage is not added anywhere

  const fetchAllListings = async () => {
    const response = await fetchFromApi("/holidaze/venues/?sort=created&sortOrder=desc");
    if (response.success) {
      setAllListingsArr(response.data);
    } else {
      console.log("this is the error that havent been checked in dataProvider:", response.error);
      setMainErrorMessage(response.error); // this errormessage have not been checked
    }
  };

  useEffect(() => {
    setMainErrorMessage("");
    fetchAllListings();
  }, []);

  //fetched all venues from the API and filter out the ones with missing location data, so that the search results will be accurate. Would wish that this was already fixed by the api, so that i could fetch it by page ang with a page limit, and not fetch all.
  useEffect(() => {
    setLoading(true);

    if (allListingsArr && allListingsArr.length >= 0) {
      const filteredOutMissingLocations = allListingsArr.filter((venue) => {
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
      setDisplayedListings(filteredOutMissingLocations);
      setLoading(false);
    }
  }, [data, allListingsArr]);

  return <DataContext.Provider value={{ displayedListings, setDisplayedListings, loading, error }}>{children}</DataContext.Provider>;
}
