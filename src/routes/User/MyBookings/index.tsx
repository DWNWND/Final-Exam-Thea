import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import MainElement from "../../../components/MainElement";
import GeneralErrorFallback from "../../../components/ErrorFallback/GeneralErrorFallback";
import { useApiCall } from "../../../hooks";
import { SmallSpinnerLoader } from "../../../components/Loaders";
import { CancellationModal } from "../../../components/Modals";
import { BookingCard } from "../../../components/Cards";
import { RoundBtn } from "../../../components/Buttons";
import { BookingSpesific } from "../../../types";

interface SelectedBooking {
  name: string;
  id: string;
}

export default function MyBookings(): JSX.Element {
  const { accessToken, userName } = useAuthStore();
  const navigate = useNavigate();

  const { loading, error, callApi } = useApiCall();

  const [selectedBooking, setSelectedBooking] = useState<SelectedBooking | null>(null);
  const [cancellationModal, setCancellationModal] = useState(false);
  const [loadMoreLoader, setLoadMoreLoader] = useState(false);
  const [activeBookingsFilter, setActiveBookingsFilter] = useState(true);
  const [inactiveBookingsFilter, setInactiveBookingsFilter] = useState(false);

  const [allBookings, setAllBookings] = useState<BookingSpesific[]>([]);
  const [activeBookingsArray, setActiveBookingsArray] = useState<BookingSpesific[]>([]);
  const [inactiveBookingsArray, setInactiveBookingsArray] = useState<BookingSpesific[]>([]);
  const [displayedActiveBookings, setDisplayedActiveBookings] = useState<BookingSpesific[]>([]);
  const [displayedInactiveBookings, setDisplayedInactiveBookings] = useState<BookingSpesific[]>([]);

  const initialDisplayCount = 10;

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  const fetchBookings = async () => {
    const result = await callApi(`/holidaze/profiles/${userName}/bookings?_venue=true&_customer=true&sort=dateFrom&sortOrder=asc`);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day

    const activeBookings = result.data.filter((booking: BookingSpesific) => {
      const dateTo = new Date(booking.dateTo);
      dateTo.setHours(0, 0, 0, 0); // Compare only the date portion
      return dateTo >= today;
    });

    const inactiveBookings = result.data.filter((booking: BookingSpesific) => {
      const dateTo = new Date(booking.dateTo);
      dateTo.setHours(0, 0, 0, 0); // Compare only the date portion
      return dateTo < today;
    });

    setActiveBookingsArray(activeBookings);
    setInactiveBookingsArray(inactiveBookings);
    setAllBookings(result.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    setDisplayedActiveBookings(activeBookingsArray.slice(0, initialDisplayCount));
  }, [activeBookingsArray]);

  useEffect(() => {
    setDisplayedInactiveBookings(inactiveBookingsArray.slice(0, initialDisplayCount));
  }, [inactiveBookingsArray]);

  const handleLoadMoreActive = () => {
    setLoadMoreLoader(true);
    const newCount = displayedActiveBookings.length + 10;
    setDisplayedActiveBookings(activeBookingsArray.slice(0, newCount));
    setLoadMoreLoader(false);
  };

  const handleLoadMoreInactive = () => {
    setLoadMoreLoader(true);
    const newCount = displayedInactiveBookings.length + 10;
    setDisplayedInactiveBookings(inactiveBookingsArray.slice(0, newCount));
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
    setDisplayedInactiveBookings(inactiveBookingsArray.slice(0, initialDisplayCount));
    setDisplayedActiveBookings(activeBookingsArray.slice(0, initialDisplayCount));
  };

  const toggleActiveBookings = () => {
    setActiveBookingsFilter(true);
    setInactiveBookingsFilter(false);
    setDisplayedInactiveBookings(inactiveBookingsArray.slice(0, initialDisplayCount));
    setDisplayedActiveBookings(activeBookingsArray.slice(0, initialDisplayCount));
  };

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>{`My Bookings | ${userName} | Holidaze`}</title>
        <meta name="description" content="View all your Holidaze bookings." />
      </Helmet>
      <MainElement>
        {error && <GeneralErrorFallback errorMessage={error} />}
        {allBookings.length > 0 && (
          <div className="flex flex-col gap-2 bg-comp-purple shadow-md p-8 rounded-lg">
            <h2 className="font-bold text-2xl md:text-3xl text-primary-blue uppercase ">My bookings</h2>
            {activeBookingsFilter && <p className="text-black">{`Showing ${displayedActiveBookings.length} of ${activeBookingsArray.length} bookings`}</p>}
            {inactiveBookingsFilter && <p className="text-black">{`Showing ${displayedInactiveBookings.length} of ${inactiveBookingsArray.length} bookings`}</p>}
            <div className="flex gap-6 my-4">
              <RoundBtn clickFunc={toggleActiveBookings} innerText="active bookings" width="full" tailw="lowercase" bgColor={activeBookingsFilter ? "primary-blue" : "white"} textColor={activeBookingsFilter ? "white" : "primary-blue"} />
              <RoundBtn clickFunc={toggleInactiveBookings} innerText="inactive bookings" width="full" tailw="lowercase" bgColor={inactiveBookingsFilter ? "primary-blue" : "white"} textColor={inactiveBookingsFilter ? "white" : "primary-blue"} />
            </div>
            {activeBookingsFilter && displayedActiveBookings.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {displayedActiveBookings.map((booking) => (
                    <BookingCard booking={booking.venue} key={booking.id} bookingDates={{ startDate: booking.dateFrom, endDate: booking.dateTo }} bookingId={booking.id} loading={loading} setSelectedBooking={setSelectedBooking} setCancellationModal={setCancellationModal} />
                  ))}
                </div>
                {activeBookingsArray.length > displayedActiveBookings.length && (
                  <>
                    <button onClick={handleLoadMoreActive} className="mt-4 px-4 py-2 border border-primary-blue text-primary-blue rounded-lg w-full">
                      Load more bookings
                    </button>
                    {loadMoreLoader && <SmallSpinnerLoader />}
                  </>
                )}
              </>
            )}
            {inactiveBookingsFilter && displayedInactiveBookings.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                  {displayedInactiveBookings.map((booking) => (
                    <BookingCard booking={booking.venue} key={booking.id} bookingDates={{ startDate: booking.dateFrom, endDate: booking.dateTo }} bookingId={booking.id} loading={loading} setSelectedBooking={setSelectedBooking} setCancellationModal={setCancellationModal} />
                  ))}
                </div>
                {inactiveBookingsArray.length > displayedInactiveBookings.length && (
                  <>
                    <button onClick={handleLoadMoreInactive} className="mt-4 px-4 py-2 border border-primary-blue text-primary-blue rounded-lg w-full">
                      Load more bookings
                    </button>
                    {loadMoreLoader && <SmallSpinnerLoader />}
                  </>
                )}
              </>
            )}
          </div>
        )}
        {cancellationModal && selectedBooking && <CancellationModal booking={selectedBooking} toggle={handleExitCancellation} />}
      </MainElement>
    </HelmetProvider>
  );
}
