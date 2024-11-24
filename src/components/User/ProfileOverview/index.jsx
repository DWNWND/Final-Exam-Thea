import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import { useApiCall } from "../../../hooks";
import VenueCard from "../../Venues/VenueCard";
import ErrorFallback from "../../ErrorFallback/index.jsx";
import { RoundBtn, SquareBtn } from "../../Buttons";
import { CancellationModal } from "../../Modals";
import BookingCard from "../../Cards/BookingCard";
import { set } from "react-hook-form";
import ListingCard from "../../Cards/ListingCard/index.jsx";

export default function ProfileOverview() {
  const { userName, logOut, setVenueManager } = useAuthStore();
  const { loading, scopedLoader, error, callApi } = useApiCall();

  const [user, setUser] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancellationModal, setCancellationModal] = useState(false);
  const [userBookings, setUserBookings] = useState([]);
  const [userListings, setUserListings] = useState([]);
  const [activeBookingsFilter, setActiveBookingsFilter] = useState(true);
  const [inactiveBookingsFilter, setInactiveBookingsFilter] = useState(false);
  const [activeBookingsArray, setActiveBookingsArray] = useState([]);
  const [inactiveBookingsArray, setInactiveBookingsArray] = useState([]);

  const navigate = useNavigate();

  const maxBookingsShown = 4;
  const maxListingsShown = 4;

  const fetchUser = async () => {
    const result = await callApi(`/holidaze/profiles/${userName}`);
    setUser(result.data);
    setVenueManager(result.data.venueManager);
  };

  const fetchBookings = async () => {
    const result = await callApi(`/holidaze/profiles/${userName}/bookings?_venue=true&_customer=true&sort=dateFrom&sortOrder=asc`);
    const activeBookings = result.data.filter((booking) => new Date(booking.dateTo) > new Date());
    setActiveBookingsArray(activeBookings);
    const inactiveBookings = result.data.filter((booking) => new Date(booking.dateTo) < new Date());
    setInactiveBookingsArray(inactiveBookings);
    setUserBookings(result.data);
  };

  const fetchVenues = async () => {
    const result = await callApi(`/holidaze/profiles/${userName}/venues?_bookings=true`);
    setUserListings(result.data);
  };

  useEffect(() => {
    fetchUser();
    fetchBookings();
    fetchVenues();
  }, []);

  const handleLogOut = () => {
    logOut();
    navigate("/");
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
              {userBookings && userBookings.length >= 1 ? (
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-2xl md:text-3xl text-primary-blue uppercase ">My bookings</h2>
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
                  <h2 className="font-bold text-2xl md:text-3xl text-primary-green uppercase">My listings</h2>
                  <p className="text-black">{`Showing ${userListings.length < maxListingsShown ? userListings.length : maxListingsShown} of ${userListings.length} ${userListings.length > 1 ? "listing" : "listings"}`}</p>
                  {userListings && userListings.length >= 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                      {userListings.slice(0, maxListingsShown).map((listing) => (
                        <ListingCard key={listing.id} listing={listing} loading={loading} myListings={true} />
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
          {cancellationModal && <CancellationModal booking={selectedBooking} toggle={handleExitCancellation} loading={scopedLoader} />}
        </>
      )}
    </>
  );
}
