import { ReactNode, useState, useEffect } from "react";
import { useApiCall } from "../../hooks";
import { DataContext } from "../../contexts/";
import { searchableLocations } from "../../assets/locations/searchableLocations";
import { capitalizeWords } from "../../utils";
import { ListingSpesific } from "../../types";

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const { loading, setLoading, error, callApi } = useApiCall();
  const [allListingsArr, setAllListingsArr] = useState<ListingSpesific[]>([]);
  const [displayedListings, setDisplayedListings] = useState<ListingSpesific[]>([]);

  useEffect(() => {
    setLoading(true);
    const fetchAllListings = async () => {
      try {
        const result = await callApi("/holidaze/venues/?sort=created&sortOrder=desc");
        setAllListingsArr(result.data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllListings();
  }, []);

  useEffect(() => {
    if (allListingsArr.length > 0) {
      const filteredOutMissingLocations = allListingsArr.filter((listing) => {
        return listing.location?.city && listing.location?.country;
      });

      filteredOutMissingLocations.forEach((listing) => {
        if (listing.location?.city) {
          const capitalizedCity = capitalizeWords(listing.location.city);
          if (!searchableLocations.includes(capitalizedCity)) {
            searchableLocations.push(capitalizedCity);
          }
        }
      });

      setDisplayedListings(filteredOutMissingLocations);
    }
  }, [allListingsArr]);

  return (
    <DataContext.Provider value={{ displayedListings, setDisplayedListings, loading, error }}>
      {children}
    </DataContext.Provider>
  );
}

// import { useApiCall } from "../../hooks";
// import { useState, useEffect } from "react";
// import { DataContext } from "../../contexts/index.jsx";
// import { searchableLocations } from "../../assets/locations/searchableLocations.js";
// import { capitalizeWords } from "../../utils/";

// export function DataProvider({ children }) {
//   const { loading, setLoading, error, callApi } = useApiCall();
//   const [allListingsArr, setAllListingsArr] = useState([]);
//   const [displayedListings, setDisplayedListings] = useState([]);

//   useEffect(() => {
//     setLoading(true);
//     const fetchAllListings = async () => {
//       const result = await callApi("/holidaze/venues/?sort=created&sortOrder=desc");
//       setAllListingsArr(result.data);
//     };
//     fetchAllListings();
//   }, []);

//   //fetched all listings from the API and filter out the ones with missing location data, so that the search results will be accurate. Would wish that this was already fixed by the api, so that i could fetch it by page ang with a page limit, and not fetch all.
//   useEffect(() => {
//     if (allListingsArr && allListingsArr.length >= 0) {
//       const filteredOutMissingLocations = allListingsArr.filter((listing) => {
//         return listing.location.city && listing.location.country;
//       });

//       filteredOutMissingLocations.forEach((listing) => {
//         if (listing.location && listing.location.city) {
//           const capitalizedCity = capitalizeWords(listing.location.city); // Capitalize the city
//           if (!searchableLocations.includes(capitalizedCity)) {
//             searchableLocations.push(capitalizedCity); // Add if not already in the array
//           }
//         }
//       });
//       setDisplayedListings(filteredOutMissingLocations);
//       setLoading(false);
//     }
//   }, [allListingsArr]);

//   return <DataContext.Provider value={{ displayedListings, setDisplayedListings, loading, error }}>{children}</DataContext.Provider>;
// }
