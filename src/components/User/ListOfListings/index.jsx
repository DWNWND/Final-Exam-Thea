import VenueCard from "../../Venues/VenueCard";
import { useAuthStore } from "../../../stores";
import { useEffect } from "react";
import { useState } from "react";
import { useApiCall } from "../../../hooks";
import { SmallSpinnerLoader } from "../../Loaders";
import ErrorFallback from "../../ErrorFallback";

export default function ListOfListings() {
  const { userName } = useAuthStore();
  const { loading, scopedLoader, error, callApi } = useApiCall();

  const [allListings, setAllListings] = useState([]);
  const [displayedListings, setDisplayedListings] = useState([]);
  const [loadMoreLoader, setLoadMoreLoader] = useState(false);

  const initialDisplayCount = 10;

  useEffect(() => {
    const fetchListings = async () => {
      const result = await callApi(`/holidaze/profiles/${userName}/venues?_bookings=true`);
      setAllListings(result.data);
    };
    fetchListings();
  }, []);

  useEffect(() => {
    setDisplayedListings(allListings.slice(0, initialDisplayCount));
  }, [allListings]);

  const handleLoadMore = () => {
    setLoadMoreLoader(true);
    const newCount = displayedListings.length + 10;
    setDisplayedListings(allListings.slice(0, newCount));
    setLoadMoreLoader(false);
  };

  return (
    <>
      {error && <ErrorFallback errorMessage={error} />}
      <div className="flex flex-col gap-2 bg-comp-green shadow-md p-8 rounded-lg">
        <h2 className="font-bold text-2xl md:text-3xl text-primary-green uppercase">My active listings</h2>
        <p className="text-black">{`Showing ${displayedListings.length < allListings.length ? displayedListings.length : allListings.length} of ${allListings.length} ${allListings.length > 1 ? "listings" : "listing"}`}</p>
        {displayedListings && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 ">
            {displayedListings.map((listing) => (
              <VenueCard key={listing.id} venue={listing} myVenues={true} loading={loading} />
            ))}
          </div>
        )}
      </div>
      {displayedListings && allListings.length > displayedListings.length && (
        <>
          <button onClick={handleLoadMore} className="mt-4 px-4 py-2 bg-primary-green text-white rounded-full w-full">
            Load more listings
          </button>
          {loadMoreLoader && <SmallSpinnerLoader />}
        </>
      )}
    </>
  );
}
