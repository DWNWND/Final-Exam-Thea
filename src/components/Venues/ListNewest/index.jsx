import { Link } from "react-router-dom";
import VenueCard from "../VenueCard";

export default function ListNewest({ venues }) {
  return (
    <>
      <h2 className="font-semibold text-xl text-primary-green uppercase">Our newest Listings</h2>
      {venues && venues.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {venues.slice(0, 10).map((venue) => (
            <VenueCard venue={venue} />
          ))}
        </div>
      )}
      <Link className="underline text-black">View all listings from this category</Link>
    </>
  );
}
