import { Link } from "react-router-dom";
import VenueCard from "../VenueCard";
import { useContext } from "react";
import { DataContext } from "../../../contexts";
import Loader from "../../../components/Loader";

export default function ListCategorized({ filters }) {
  const { venues, loading, error } = useContext(DataContext);

  return (
    // <>
    //   {isLoading ? (
    //     <Loader />
    //   ) : (
    <>
      <h2 className="font-bold text-2xl md:text-3xl md:ml-4 text-center md:text-left text-primary-green uppercase mb-6">{filters}</h2>

      {venues && venues.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
          {venues
            .filter((venue) => {
              if (filters.toLowerCase().includes("unique")) {
                return venue.name.toLowerCase().includes("unique") || venue.description.toLowerCase().includes("unique");
              } else if (filters.toLowerCase().includes("luxury")) {
                return venue.name.toLowerCase().includes("luxury") || venue.description.toLowerCase().includes("luxury");
              } else if (filters.toLowerCase().includes("rating")) {
                return venue.rating > 4;
              } else {
                return venue;
              }
            })
            .slice(0, 4)
            .map((venue) => (
              <VenueCard venue={venue} key={venue.id} loading={loading} />
            ))}
        </div>
      )}
      <Link className="lg:ml-4 text-center lg:text-left block mt-4 underline text-black">View all listings from this category</Link>
    </>
    //   )}
    // </>
  );
}
