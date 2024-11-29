import VenueCard from "../../Venues/VenueCard";
import { Link } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export default function ListVenues({ venues, maxVenuesShown, loading }) {
  const { userName } = useAuthStore();
  const [allListings, setAllListings] = useState([]);
  const [displayedListings, setDisplayedListings] = useState([]);
  const [loadMoreLoader, setLoadMoreLoader] = useState(false);
  const initialDisplayCount = 10;

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    setAllListings(venues);
    setDisplayedListings(venues.slice(0, initialDisplayCount));
  }, [venues]);

  const handleLoadMore = () => {
    setLoadMoreLoader(true);
    const newCount = displayedListings.length + 10;
    setDisplayedListings(allListings.slice(0, newCount));
    setLoadMoreLoader(false);
  };

  if (path.toLowerCase().includes("mylistings")) {
    return (
      <>
        <div className="flex flex-col gap-2 bg-comp-green shadow-md p-8 rounded-lg">
          <h2 className="font-bold text-2xl md:text-3xl text-primary-green uppercase">My active listings</h2>
          <p className="text-black">{`Showing ${displayedListings.length < allListings.length ? displayedListings.length : allListings.length} of ${allListings.length} ${allListings.length > 1 ? "venues" : "venue"}`}</p>
          {displayedListings && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 ">
              {displayedListings.map((venue) => (
                <VenueCard venue={venue} myVenues={true} loading={loading} />
              ))}
            </div>
          )}
        </div>
        {displayedListings && allListings.length > displayedListings.length && (
          <>
            <button onClick={handleLoadMore} className="mt-4 px-4 py-2 bg-primary-blue text-white rounded-full w-full">
              Load more listings
            </button>
            {loadMoreLoader && <SmallLoader />}
          </>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-2 bg-comp-green shadow-md p-8 rounded-lg">
      <h2 className="font-bold text-2xl md:text-3xl text-primary-green uppercase">My active listings</h2>
      <p className="text-black">{`Showing ${venues.length < maxVenuesShown ? venues.length : maxVenuesShown} of ${venues.length} ${venues.length > 1 ? "venues" : "venue"}`}</p>
      {venues && venues.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 ">
          {venues.slice(0, maxVenuesShown).map((venue) => (
            <VenueCard venue={venue} myVenues={true} loading={loading} />
          ))}
        </div>
      )}
      {venues && venues.length > maxVenuesShown && (
        <Link to={`/user/${userName}/mylistings`} className="md:text-center block mt-4 underline text-black">
          View all my active listings
        </Link>
      )}
    </div>
  );
}
