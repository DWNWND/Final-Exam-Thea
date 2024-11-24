import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores";
import { useApiCall } from "../../../hooks";
import ErrorFallback from "../../ErrorFallback/index.jsx";
import { BigSpinnerLoader } from "../../Loaders";
import { CancellationModal } from "../../Modals";
import BookingCard from "../../Cards/BookingCard";

// ADD SKELETONLOADER AND ERRORHANDLING + DISBALE CANCELALTION BTN WHEN WAITING FOR RESPONSE + WHEN REDIRECTING TO PROFILE, ADD A LOADER

export default function ListOfBookings() {
  const { userName } = useAuthStore();
  const { loading, scopedLoader, error, callApi } = useApiCall();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancellationModal, setCancellationModal] = useState(false);
  const [allBookings, setAllBookings] = useState([]);
  const [displayedBookings, setDisplayedBookings] = useState([]);
  const [loadMoreLoader, setLoadMoreLoader] = useState(false);
  const [activeBookingsFilter, setActiveBookingsFilter] = useState(true);
  const [inactiveBookingsFilter, setInactiveBookingsFilter] = useState(false);
  const [activeBookingsArray, setActiveBookingsArray] = useState([]);
  const [inactiveBookingsArray, setInactiveBookingsArray] = useState([]);

  const initialDisplayCount = 10;

  const fetchBookings = async () => {
    const result = await callApi(`/holidaze/profiles/${userName}/bookings?_venue=true&_customer=true&sort=dateFrom&sortOrder=asc`);
    const activeBookings = result.data.filter((booking) => new Date(booking.dateTo) > new Date());
    setActiveBookingsArray(activeBookings);
    const inactiveBookings = result.data.filter((booking) => new Date(booking.dateTo) < new Date());
    setInactiveBookingsArray(inactiveBookings);
    setAllBookings(result.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // useEffect(() => {
  //   setDisplayedBookings(allBookings.slice(0, initialDisplayCount));
  // }, [allBookings]);

  useEffect(() => {
    setDisplayedBookings(activeBookingsArray.slice(0, initialDisplayCount));
  }, [activeBookingsFilter]);

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

  const toggleInactiveBookings = () => {
    setActiveBookingsFilter(false);
    setInactiveBookingsFilter(true);
  };

  const toggleActiveBookings = () => {
    setActiveBookingsFilter(true);
    setInactiveBookingsFilter(false);
  };
  return (
    <>
      {error && error && <ErrorFallback errorMessage={error} />}
      {allBookings && allBookings.length > 1 && (
        <>
          <div className="flex flex-col gap-2 bg-comp-purple shadow-md p-8 rounded-lg">
            <h2 className="font-bold text-2xl md:text-3xl text-primary-blue uppercase ">My bookings</h2>
            {/* <p className="text-black">{`Showing ${displayedBookings.length < allBookings.length ? displayedBookings.length : allBookings.length} of ${allBookings.length} ${allBookings.length > 1 ? "booking" : "bookings"}`}</p>
            {displayedBookings && displayedBookings.length >= 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4 ">
                {displayedBookings.map((booking) => (
                  <BookingCard booking={booking.venue} key={booking.id} bookingDates={{ startDate: booking.dateFrom, endDate: booking.dateTo }} bookingId={booking.id} loading={loading} setSelectedBooking={setSelectedBooking} setCancellationModal={setCancellationModal} />
                ))}
              </div>
            )} */}
            {activeBookingsFilter && <p className="text-black">{`Showing ${activeBookingsArray.length < maxBookingsShown ? activeBookingsArray.length : maxBookingsShown} of ${activeBookingsArray.length} ${activeBookingsArray.length > 1 ? "bookings" : "booking"}`}</p>}
            {inactiveBookingsFilter && <p className="text-black">{`Showing ${inactiveBookingsArray.length < maxBookingsShown ? inactiveBookingsArray.length : maxBookingsShown} of ${inactiveBookingsArray.length} ${inactiveBookingsArray.length > 1 ? "bookings" : "booking"}`}</p>}
            <div className="flex gap-6 my-4">
              <RoundBtn clickFunc={toggleActiveBookings} innerText="active bookings" width="full" tailw="lowercase" bgColor={`${activeBookingsFilter ? "primary-blue" : "white"}`} textColor={`${activeBookingsFilter ? "white" : "primary-blue"}`} />
              <RoundBtn clickFunc={toggleInactiveBookings} innerText="inactive bookings" width="full" tailw="lowercase" bgColor={`${activeBookingsFilter ? "white" : "primary-blue"}`} textColor={`${activeBookingsFilter ? "primary-blue" : "white"}`} />
            </div>
            {activeBookingsFilter && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {activeBookingsArray.slice(0, maxBookingsShown).map((booking) => (
                  <BookingCard booking={booking.venue} key={booking.id} bookingDates={{ startDate: booking.dateFrom, endDate: booking.dateTo }} bookingId={booking.id} loading={loading} setSelectedBooking={setSelectedBooking} setCancellationModal={setCancellationModal} />
                ))}
              </div>
            )}
            {inactiveBookingsFilter && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {inactiveBookingsArray.slice(0, maxBookingsShown).map((booking) => (
                  <BookingCard booking={booking.venue} key={booking.id} bookingDates={{ startDate: booking.dateFrom, endDate: booking.dateTo }} bookingId={booking.id} loading={loading} setSelectedBooking={setSelectedBooking} setCancellationModal={setCancellationModal} />
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
