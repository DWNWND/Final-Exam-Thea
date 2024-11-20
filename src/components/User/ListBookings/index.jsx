import VenueCard from "../../Venues/VenueCard";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import {BigSpinnerLoader} from "../../Loaders";

export default function ListBookings({ bookings, maxVenuesShown, loading, setSelectedBooking, setCancellationModal }) {
  const { userName } = useAuthStore();
  const [allListings, setAllListings] = useState([]);
  const [displayedListings, setDisplayedListings] = useState([]);
  const [loadMoreLoader, setLoadMoreLoader] = useState(false);
  const initialDisplayCount = 10;

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    setAllListings(bookings);
    setDisplayedListings(bookings.slice(0, initialDisplayCount));
  }, [bookings]);

  const handleLoadMore = () => {
    setLoadMoreLoader(true);
    const newCount = displayedListings.length + 10;
    setDisplayedListings(allListings.slice(0, newCount));
    setLoadMoreLoader(false);
  };

  if (path.toLowerCase().includes("mybookings")) {
    return (
      <>
        <div className="flex flex-col gap-2 bg-comp-purple shadow-md p-8 rounded-lg">
          <h2 className="font-bold text-2xl md:text-3xl text-primary-blue uppercase ">My bookings</h2>
          <p className="text-black">{`Showing ${displayedListings.length < allListings.length ? displayedListings.length : allListings.length} of ${allListings.length} ${allListings.length > 1 ? "bookings" : "booking"}`}</p>
          {displayedListings && displayedListings.length >= 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 ">
              {displayedListings.map((booking) => (
                <VenueCard venue={booking.venue} bookingDates={{ startDate: booking.dateFrom, endDate: booking.dateTo }} key={booking.id} bookingId={booking.id} myBookings={true} loading={loading} setSelectedBooking={setSelectedBooking} setCancellationModal={setCancellationModal} />
              ))}
            </div>
          )}
        </div>
        {displayedListings && allListings.length > displayedListings.length && (
          <>
            <button onClick={handleLoadMore} className="mt-4 px-4 py-2 bg-primary-blue text-white rounded-full w-full">
              Load more bookings
            </button>
            {loadMoreLoader && <BigSpinnerLoader />}
          </>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-2xl md:text-3xl text-primary-blue uppercase ">My bookings</h2>
      <p className="text-black">{`Showing ${bookings.length < maxVenuesShown ? bookings.length : maxVenuesShown} of ${bookings.length} ${bookings.length > 1 ? "bookings" : "booking"}`}</p>
      {bookings && bookings.length >= 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3  gap-6">
          {bookings.slice(0, maxVenuesShown).map((booking) => (
            <VenueCard venue={booking.venue} key={booking.id} bookingDates={{ startDate: booking.dateFrom, endDate: booking.dateTo }} bookingId={booking.id} myBookings={true} loading={loading} setSelectedBooking={setSelectedBooking} setCancellationModal={setCancellationModal} />
          ))}
        </div>
      )}
      {bookings && bookings.length > maxVenuesShown && (
        <Link to={`/user/${userName}/mybookings`} className="md:text-center  block mt-4 underline text-black">
          View all my active listings
        </Link>
      )}
    </div>
  );
}
