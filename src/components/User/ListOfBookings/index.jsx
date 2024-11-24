import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores";
import { useApiCall } from "../../../hooks";
import ErrorFallback from "../../ErrorFallback/index.jsx";
import VenueCard from "../../Venues/VenueCard";
import { BigSpinnerLoader } from "../../Loaders";
import { CancellationModal } from "../../Modals";

// ADD SKELETONLOADER AND ERRORHANDLING + DISBALE CANCELALTION BTN WHEN WAITING FOR RESPONSE + WHEN REDIRECTING TO PROFILE, ADD A LOADER

export default function ListOfBookings() {
  const { userName } = useAuthStore();
  const { loading, scopedLoader, error, callApi } = useApiCall();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancellationModal, setCancellationModal] = useState(false);
  const [allBookings, setAllBookings] = useState([]);
  const [displayedBookings, setDisplayedBookings] = useState([]);
  const [loadMoreLoader, setLoadMoreLoader] = useState(false);

  const initialDisplayCount = 10;

  const fetchBookings = async () => {
    const result = await callApi(`/holidaze/profiles/${userName}/bookings?_venue=true&_customer=true&sort=dateFrom&sortOrder=asc`);
    setAllBookings(result.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    setDisplayedBookings(allBookings.slice(0, initialDisplayCount));
  }, [allBookings]);

  const handleLoadMore = () => {
    setLoadMoreLoader(true);
    const newCount = displayedBookings.length + 10;
    setDisplayedBookings(allBookings.slice(0, newCount));
    setLoadMoreLoader(false);
  };

  const handleExitCancellation = () => {
    setCancellationModal(false);
    setSelectedBooking(null);
    fetchBookings();
  };

  return (
    <>
      {error && error && <ErrorFallback errorMessage={error} />}
      {allBookings && allBookings.length > 1 && (
        <>
          <div className="flex flex-col gap-2 bg-comp-purple shadow-md p-8 rounded-lg">
            <h2 className="font-bold text-2xl md:text-3xl text-primary-blue uppercase ">My bookings</h2>
            <p className="text-black">{`Showing ${displayedBookings.length < allBookings.length ? displayedBookings.length : allBookings.length} of ${allBookings.length} ${allBookings.length > 1 ? "booking" : "bookings"}`}</p>
            {displayedBookings && displayedBookings.length >= 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 ">
                {displayedBookings.map((booking) => (
                  <VenueCard venue={booking.venue} bookingDates={{ startDate: booking.dateFrom, endDate: booking.dateTo }} key={booking.id} bookingId={booking.id} myBookings={true} loading={loading} setSelectedBooking={setSelectedBooking} setCancellationModal={setCancellationModal} />
                ))}
              </div>
            )}
          </div>
          {displayedBookings && allBookings.length > displayedBookings.length && (
            <>
              <button onClick={handleLoadMore} className="mt-4 px-4 py-2 bg-primary-blue text-white rounded-full w-full">
                Load more bookings
              </button>
              {loadMoreLoader && <BigSpinnerLoader />}
            </>
          )}
        </>
      )}
      {cancellationModal && <CancellationModal booking={selectedBooking} toggle={handleExitCancellation} loading={scopedLoader} />}
    </>
  );
}
