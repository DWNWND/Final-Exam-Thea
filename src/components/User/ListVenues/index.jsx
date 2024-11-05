import VenueCard from "../../Venues/VenueCard";
import { Link } from "react-router-dom";


export default function ListVenues({ venues }) {
  return (
    <>
      <h2 className="font-bold text-2xl text-primary-green uppercase mb-4">My active listings</h2>
      {venues && venues.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {venues.slice(0, 4).map((venue) => (
            <VenueCard venue={venue} key={venue.id} myVenues="true" />
          ))}
        </div>
      )}
      <Link className="md:text-center lg:text-left block mt-4 underline text-black">View all my active listings</Link>
    </>
  );
}
