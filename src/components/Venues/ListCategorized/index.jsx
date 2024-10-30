import { Link } from "react-router-dom";
import VenueCard from "../VenueCard";
import { useContext } from "react";
import { DataContext } from "../../../components/DataProvider";

export default function ListCategorized({ filters }) {
  const { venues } = useContext(DataContext);

  return (
    <>
      {venues && venues.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {venues
            .filter((venue) => {
              if (filters === "unique") {
                return venue.name.toLowerCase().includes("unique") || venue.description.toLowerCase().includes("unique");
              } else if (filters === "luxury") {
                return venue.name.toLowerCase().includes("luxury") || venue.description.toLowerCase().includes("luxury");
              } else if (filters === "rating") {
                return venue.rating > 4;
              } else {
                return venue;
              }
            }).slice(0, 4)
            .map((venue) => (
              <VenueCard venue={venue} key={venue.id} />
            ))}
        </div>
      )}
      <Link className="md:text-center lg:text-left block mt-4 underline text-black">View all listings from this category</Link>
    </>
  );
}
