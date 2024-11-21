import { Link } from "react-router-dom";
import VenueCard from "../VenueCard";
import { useContext } from "react";
import { DataContext } from "../../../contexts";
import { BigSpinnerLoader } from "../../../components/Loaders";

export default function ListCategorized({ filters }) {
  const { displayedListings, loading, error } = useContext(DataContext);

  return (
    // <>
    //   {isLoading ? (
    //     <BigSpinnerLoader />
    //   ) : (
    <>
      <h2 className="font-bold text-2xl md:text-3xl md:ml-4 text-center md:text-left text-primary-green uppercase mb-6">{filters}</h2>

      {displayedListings && displayedListings.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
          {displayedListings
            .filter((listing) => {
              if (filters.toLowerCase().includes("unique")) {
                return listing.name.toLowerCase().includes("unique") || listing.description.toLowerCase().includes("unique");
              } else if (filters.toLowerCase().includes("luxury")) {
                return listing.name.toLowerCase().includes("luxury") || listing.description.toLowerCase().includes("luxury");
              } else if (filters.toLowerCase().includes("rating")) {
                return listing.rating > 4;
              } else {
                return listing;
              }
            })
            .slice(0, 4)
            .map((listing) => (
              <VenueCard venue={listing} key={listing.id} loading={loading} />
            ))}
        </div>
      )}
      <Link className="lg:ml-4 text-center lg:text-left block mt-4 underline text-black">View all listings from this category</Link>
    </>
    //   )}
    // </>
  );
}
