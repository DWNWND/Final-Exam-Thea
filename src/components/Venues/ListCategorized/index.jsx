import { Link } from "react-router-dom";
import VenueCard from "../VenueCard";

export default function ListCategorized({ venues, filters }) {
  return (
    <>
      {venues && venues.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            })
            .map((venue) => (
              <VenueCard venue={venue} />
            ))}
        </div>
      )}
      <Link className="underline text-black">View all listings from this category</Link>
    </>
  );
}
