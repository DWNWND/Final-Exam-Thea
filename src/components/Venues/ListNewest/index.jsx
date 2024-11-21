import { Link } from "react-router-dom";
import VenueCard from "../VenueCard";
import { useContext } from "react";
import { DataContext } from "../../../contexts";
import { BigSpinnerLoader } from "../../../components/Loaders";

export default function ListNewest() {
  const { displayedListings, loading, error } = useContext(DataContext);

  return (
    <>
      <h2 className="font-bold text-2xl md:text-3xl md:ml-4 text-center md:text-left text-primary-green uppercase mb-6">Our newest Listings</h2>
      {/* <>
        {isLoading ? (
          <BigSpinnerLoader />
        ) : ( */}
      <>
        {displayedListings && displayedListings.length >= 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 ">
            {displayedListings.slice(0, 6).map((listing) => (
              <VenueCard venue={listing} key={listing.id} loading={loading} />
            ))}
          </div>
        )}
        <Link className="lg:ml-4 text-center lg:text-left block mt-4 underline text-black">View all listings from this category</Link>
      </>
      {/* )}
      </> */}
    </>
  );
}
