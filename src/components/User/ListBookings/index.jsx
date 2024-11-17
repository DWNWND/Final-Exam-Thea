import VenueCard from "../../Venues/VenueCard";
import { Link } from "react-router-dom";

export default function ListBookings({ bookings, maxVenuesShown, isLoading, setIsLoading, setSelectedBooking, setPromptModal }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-2xl md:text-3xl text-primary-blue uppercase ">My bookings</h2>
      <p className="text-black">{`Showing ${bookings.length} of ${bookings.length} bookings`}</p>
      {bookings && bookings.length >= 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 ">
          {bookings.slice(0, maxVenuesShown).map((booking) => (
            <VenueCard venue={booking.venue} key={booking.id} bookingId={booking.id} myBookings={true} isLoading={isLoading} setIsLoading={setIsLoading} setSelectedBooking={setSelectedBooking} setPromptModal={setPromptModal} />
          ))}
        </div>
      )}
      {/* <Link className="md:text-center lg:text-left block mt-4 underline text-black">View all my active listings</Link> */}
    </div>
  );
}
