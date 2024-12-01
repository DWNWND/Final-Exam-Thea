import { ReactNode, useState, useEffect } from "react";
import { useApiCall } from "../../hooks";
import { DataContext } from "../../contexts/";
import { searchableLocations } from "../../assets/locations/searchableLocations";
import { capitalizeWords } from "../../utils";
import { ListingSpecificProps } from "../../types";

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const { loading, setLoading, error, callApi } = useApiCall();
  const [allListingsArr, setAllListingsArr] = useState<ListingSpecificProps[]>([]);
  const [displayedListings, setDisplayedListings] = useState<ListingSpecificProps[]>([]);

  const fetchAllListings = async () => {
    const result = await callApi("/holidaze/venues/?sort=created&sortOrder=desc");
    setAllListingsArr(result.data);
  };

  useEffect(() => {
    setLoading(true);
    fetchAllListings();
  }, []);

  useEffect(() => {
    if (allListingsArr.length > 0) {
      const filteredOutMissingLocations = allListingsArr.filter((listing) => {
        return listing.location.city && listing.location.country;
      });

      filteredOutMissingLocations.forEach((listing) => {
        if (listing.location.city) {
          const capitalizedCity = capitalizeWords(listing.location.city);
          if (!searchableLocations.includes(capitalizedCity)) {
            searchableLocations.push(capitalizedCity);
          }
        }
      });
      setDisplayedListings(filteredOutMissingLocations);
      setLoading(false);
    }
  }, [allListingsArr]);

  return <DataContext.Provider value={{ displayedListings, setDisplayedListings, loading, error }}>{children}</DataContext.Provider>;
}
