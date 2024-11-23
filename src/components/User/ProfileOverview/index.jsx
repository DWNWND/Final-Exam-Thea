import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import { SmallSpinnerLoader } from "../../../components/Loaders";
import { useApiCall } from "../../../hooks";
import { IoIosClose } from "react-icons/io";
import VenueCard from "../../Venues/VenueCard";
import ErrorFallback from "../../ErrorFallback/index.jsx";
import { RoundBtn, SquareBtn } from "../../Buttons";

export default function ProfileOverview() {
  const { userName, logOut } = useAuthStore();
  const { loading, scopedLoader, error, callApi } = useApiCall();

  const [user, setUser] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancellationModal, setCancellationModal] = useState(false);

  const [userFeedbackCancellationMessage, setUserFeedbackCancellationMessage] = useState("");
  const [errorCancellationMessage, setErrorCancellationMessage] = useState("");

  const navigate = useNavigate();
  const [userBookings, setUserBookings] = useState([]);
  const [userListings, setUserListings] = useState([]);

  const maxBookingsShown = 4;
  const maxListingsShown = 4;

  const fetchUser = async () => {
    const result = await callApi(`/holidaze/profiles/${userName}`);
    setUser(result.data);
  };

  const fetchBookings = async () => {
    const result = await callApi(`/holidaze/profiles/${userName}/bookings?_venue=true&_customer=true&sort=dateFrom&sortOrder=asc`);
    setUserBookings(result.data);
  };

  const fetchVenues = async () => {
    const result = await callApi(`/holidaze/profiles/${userName}/venues?_bookings=true`);
    setUserListings(result.data);
  };

  useEffect(() => {
    setErrorCancellationMessage("");
    setUserFeedbackCancellationMessage("");
  }, [cancellationModal]);

  useEffect(() => {
    fetchUser();
    fetchBookings();
    fetchVenues();
  }, []);

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

  function handleLogOut() {
    logOut();
    navigate("/");
  }

  return (
    <>
      {error && <ErrorFallback errorMessage={error} />}
      {user && (
        <>
          <section className="flex flex-col gap-2 lg:max-w-md">
            <div className="xl:sticky xl:top-6 xl:pb-9">
              <div className="flex flex-col mb-6 p-2 gap-2 ">
                <Link to="/" className="text-primary-blue underline text-lg">
                  Book your next stay
                </Link>
                <>
                  {user.venueManager ? (
                    <Link to={`/user/${userName}/new/listing`} className="text-primary-blue underline text-lg">
                      Publish new listing
                    </Link>
                  ) : (
                    <Link to={`/user/${userName}/settings`} className="text-primary-blue underline text-lg">
                      Register as a venue manager
                    </Link>
                  )}
                </>
                <Link className="text-primary-blue underline text-lg" onClick={() => handleLogOut()}>
                  Log out
                </Link>
              </div>
              <div className="bg-comp-purple p-6 rounded-lg shadow-md w-full h-fit xl:sticky xl:top-20">
                {user.venueManager && (
                  <div className="flex items-center justify-center">
                    <span className="text-md bg-white text-primary-blue font-semibold w-full text-center px-3 py-2 rounded-full">Registered Venue Manager</span>
                  </div>
                )}
                <div className="flex my-4 gap-4 items-center p-4">
                  <div>
                    <img src={user.avatar.url} className="max-w-20 max-h-20 rounded-full"></img>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold">{user.name}</p>
                    <p className="">{user.bio}</p>
                    <p className="">Registered contact info: {user.email}</p>
                  </div>
                </div>
                <Link to={`/user/${userName}/settings`}>
                  <SquareBtn innerText="my settings" width="full" tailw="lowercase" bgColor="transparent" textColor="primary-purple" />
                </Link>
              </div>
            </div>
          </section>
          <section className="w-full pb-10">
            <div className="flex flex-col gap-12">
              {userBookings.length >= 1 ? (
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-2xl md:text-3xl text-primary-blue uppercase ">My bookings</h2>
                  <p className="text-black">{`Showing ${userBookings.length < maxBookingsShown ? userBookings.length : maxBookingsShown} of ${userBookings.length} ${userBookings.length > 1 ? "bookings" : "booking"}`}</p>
                  {userBookings && userBookings.length >= 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                      {userBookings.slice(0, maxBookingsShown).map((booking) => (
                        <VenueCard venue={booking.venue} key={booking.id} bookingDates={{ startDate: booking.dateFrom, endDate: booking.dateTo }} bookingId={booking.id} myBookings={true} loading={loading} setSelectedBooking={setSelectedBooking} setCancellationModal={setCancellationModal} />
                      ))}
                    </div>
                  )}
                  {userBookings && userBookings.length > maxBookingsShown && (
                    <Link to={`/user/${userName}/mybookings`} className="mt-3">
                      <RoundBtn innerText="all bookings" width="full" tailw="lowercase" bgColor="primary-blue" textColor="white" />
                    </Link>
                  )}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center my-6 gap-4">
                  <p className="italic text-center">You currently have no bookings</p>
                  <Link to="/" className="text-primary-blue underline text-lg">
                    Start planning your next adventure now!
                  </Link>
                </div>
              )}
              {userListings.length > 1 && (
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-2xl md:text-3xl text-primary-green uppercase">My active listings</h2>
                  <p className="text-black">{`Showing ${userListings.length < maxListingsShown ? userListings.length : maxListingsShown} of ${userListings.length} ${userListings.length > 1 ? "listing" : "listings"}`}</p>
                  {userListings && userListings.length >= 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                      {userListings.slice(0, maxListingsShown).map((listing) => (
                        <VenueCard key={listing.id} venue={listing} myVenues={true} loading={loading} />
                      ))}
                    </div>
                  )}
                  {userListings && userListings.length > maxListingsShown && (
                    <Link to={`/user/${userName}/mylistings`} className="mt-3">
                      <RoundBtn innerText="all listings" width="full" tailw="lowercase" bgColor="primary-green" textColor="white" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </section>
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
      )}
    </>
  );
}
