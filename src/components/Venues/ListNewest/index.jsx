import { Link } from "react-router-dom";
import VenueCard from "../VenueCard";

export default function ListNewest({ venues }) {
  return (
    <>
      <h2 className="font-bold text-2xl text-primary-green uppercase mb-4">Our newest Listings</h2>
      {venues && venues.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {venues.slice(0, 10).map((venue) => (
            <VenueCard venue={venue} key={venue.id} />
          ))}
        </div>
      )}
      <Link className="md:text-center lg:text-left block mt-4 underline text-black">View all listings from this category</Link>
    </>
  );
}
