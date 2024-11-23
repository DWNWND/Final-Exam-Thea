import { useEffect, useState } from "react";
import { useAuthStore } from "../../../stores";
import { useApiCall } from "../../../hooks";

import { IoIosClose } from "react-icons/io";
import SquareBtn from "../../../components/Buttons/SquareBtn/index.jsx";
import ErrorFallback from "../../../components/ErrorFallback/index.jsx";
import VenueCard from "../../Venues/VenueCard";
import { BigSpinnerLoader, SmallSpinnerLoader } from "../../Loaders";

// ADD SKELETONLOADER AND ERRORHANDLING + DISBALE CANCELALTION BTN WHEN WAITING FOR RESPONSE + WHEN REDIRECTING TO PROFILE, ADD A LOADER

export default function ListOfBookings() {
  const { userName } = useAuthStore();
  const { loading, scopedLoader, error, callApi } = useApiCall();

  const [userFeedbackCancellationMessage, setUserFeedbackCancellationMessage] = useState("");
  const [errorCancellationMessage, setErrorCancellationMessage] = useState("");

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

  useEffect(() => {
    setErrorCancellationMessage("");
    setUserFeedbackCancellationMessage("");
  }, [cancellationModal]);

  function handleExitCancellation() {
    setCancellationModal(false);
    setSelectedBooking(null);
    fetchBookings();
  }

  const handleCancellation = async () => {
    setErrorCancellationMessage("");
    setUserFeedbackCancellationMessage("");

    try {
      await callApi(`/holidaze/bookings/${selectedBooking.id}`, {
        method: "DELETE",
      });

      let countdown = 3;
      setUserFeedbackCancellationMessage(`Booking successfully cancelled. Redirecting in ${countdown} seconds...`);

      const countdownInterval = setInterval(() => {
        countdown -= 1;
        if (countdown > 0) {
          setUserFeedbackCancellationMessage(`Booking successfully cancelled. Redirecting in ${countdown} seconds...`);
        } else {
          clearInterval(countdownInterval);
          handleExitCancellation();
        }
      }, 1000);
    } catch (error) {
      console.log("error:", err);
      setErrorCancellationMessage("Cancellation failed: " + error);
    }
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
      {cancellationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:max-w-[50rem] mx-10 relative">
            <button className="absolute top-2 right-2 text-primary-blue text-3xl" onClick={() => handleExitCancellation()}>
              <IoIosClose />
            </button>
            <h2 className="text-xl font-bold mb-4 text-primary-blue">Are you sure you want to cancel your booking at {selectedBooking.name}?</h2>
            <p className="text-sm mb-6 text-primary-blue">This action cannot be undone.</p>
            <div className="flex justify-end gap-4 mb-5">
              <SquareBtn clickFunc={() => handleExitCancellation()} type="button" width="full" innerText="No" tailw="hover:bg-primary-blue hover:text-white" bgColor="white" textColor="primary-blue" borderColor="primary-blue" />
              <SquareBtn clickFunc={() => handleCancellation()} type="button" width="full" innerText="Yes" tailw="hover:bg-danger hover:text-white" bgColor="white" textColor="danger" borderColor="danger" />
            </div>
            {scopedLoader ? <SmallSpinnerLoader /> : <p className={`${errorCancellationMessage ? "text-danger" : "text-primary-green"} text-xs text-center`}>{errorCancellationMessage ? errorCancellationMessage : userFeedbackCancellationMessage}</p>}
          </div>
        </div>
      )}
    </>
  );
}
