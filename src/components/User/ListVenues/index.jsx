import VenueCard from "../../Venues/VenueCard";
import { Link } from "react-router-dom";

export default function ListVenues({ venues, maxVenuesShown, isLoading, setIsLoading }) {
  return (
    <div className="flex flex-col gap-2 bg-comp-green shadow-md p-8 rounded-lg">
      <h2 className="font-bold text-2xl md:text-3xl text-primary-green uppercase">My active listings</h2>
      <p className="text-black">{`Showing ${venues.length} of ${venues.length} venues`}</p>
      {venues && venues.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 ">
          {venues.slice(0, maxVenuesShown).map((venue) => (
            <VenueCard venue={venue} key={venue.id} myVenues={true} isLoading={isLoading} setIsLoading={setIsLoading}/>
          ))}
        </div>
      )}
      {/* <Link className="md:text-center lg:text-left block mt-4 underline text-black">View all my active listings</Link> */}
    </div>
  );
}
