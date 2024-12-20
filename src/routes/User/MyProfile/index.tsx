import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import { useApiCall } from "../../../hooks";
import MainElement from "../../../components/MainElement";
import GeneralErrorFallback from "../../../components/ErrorFallback/GeneralErrorFallback";
import { CancellationModal } from "../../../components/Modals";
import { RoundBtn, SquareBtn } from "../../../components/Buttons";
import { BookingCard, ListingCard, ProfileCard } from "../../../components/Cards";
import { BookingSpecific, ListingSpecificProps, UserSpecific } from "../../../types";
import { BigSpinnerLoader } from "../../../components/Loaders";

interface SelectedBooking {
  name: string;
  id: string;
}

export default function MyProfile(): JSX.Element {
  const { userName, accessToken, logOut, setVenueManager } = useAuthStore();
  const { loading, error, callApi } = useApiCall();

  const [user, setUser] = useState<UserSpecific | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<SelectedBooking | null>(null);
  const [cancellationModal, setCancellationModal] = useState(false);
  const [userBookings, setUserBookings] = useState<BookingSpecific[]>([]);
  const [userListings, setUserListings] = useState<ListingSpecificProps[]>([]);
  const [activeBookingsFilter, setActiveBookingsFilter] = useState(true);
  const [inactiveBookingsFilter, setInactiveBookingsFilter] = useState(false);
  const [activeBookingsArray, setActiveBookingsArray] = useState<BookingSpecific[]>([]);
  const [inactiveBookingsArray, setInactiveBookingsArray] = useState<BookingSpecific[]>([]);

  const navigate = useNavigate();

  const maxBookingsShown = 6;
  const maxListingsShown = 6;

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  const fetchBookings = async () => {
    const result = await callApi<BookingSpecific[]>(`/holidaze/profiles/${userName}/bookings?_venue=true&_customer=true&sort=dateFrom&sortOrder=asc`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (result.data) {
      const activeBookings = result.data.filter((booking) => {
        const dateTo = new Date(booking.dateTo);
        dateTo.setHours(0, 0, 0, 0);
        return dateTo >= today;
      });

      const inactiveBookings = result.data.filter((booking) => {
        const dateTo = new Date(booking.dateTo);
        dateTo.setHours(0, 0, 0, 0);
        return dateTo < today;
      });

      setActiveBookingsArray(activeBookings);
      setInactiveBookingsArray(inactiveBookings);
      setUserBookings(result.data);
    }
  };

  const fetchUser = async () => {
    const result = await callApi<UserSpecific>(`/holidaze/profiles/${userName}`);
    if (result.data) {
      setUser(result.data);
      setVenueManager(result.data.venueManager);
    }
  };

  const fetchListings = async () => {
    const result = await callApi<ListingSpecificProps[]>(`/holidaze/profiles/${userName}/venues?_bookings=true`);
    if (result.data) {
      setUserListings(result.data);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchListings();
    fetchBookings();
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
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>{`My Profile | ${userName} | Holidaze`}</title>
        <meta name="description" content="View your Holidaze account details, manage your listings, track bookings, and stay updated with your activity." />
      </Helmet>
      <MainElement tail="flex flex-col gap-8 lg:flex-row min-h-screen">
        {loading ? (
          <BigSpinnerLoader />
        ) : (
          <>
            {error && <GeneralErrorFallback errorMessage={error} />}
            <section className="flex flex-col gap-2 lg:max-w-md">
              {user && (
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
                    <p className="text-primary-blue underline text-lg cursor-pointer" onClick={() => handleLogOut()}>
                      Log out
                    </p>
                  </div>
                  <ProfileCard user={user} />
                </div>
              )}
            </section>
            <section className="w-full pb-10">
              <div className="flex flex-col gap-12">
                {userBookings && userBookings.length >= 1 ? (
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-2xl md:text-3xl text-primary-blue uppercase ">My bookings</h2>
                    {activeBookingsFilter && <p className="text-black">{`Showing ${activeBookingsArray.length < maxBookingsShown ? activeBookingsArray.length : maxBookingsShown} of ${activeBookingsArray.length} ${activeBookingsArray.length > 1 ? "bookings" : "booking"}`}</p>}
                    {inactiveBookingsFilter && <p className="text-black">{`Showing ${inactiveBookingsArray.length < maxBookingsShown ? inactiveBookingsArray.length : maxBookingsShown} of ${inactiveBookingsArray.length} ${inactiveBookingsArray.length > 1 ? "bookings" : "booking"}`}</p>}
                    <div className="flex gap-2 xl:gap-6  my-4 flex-col md:flex-row">
                      <RoundBtn clickFunc={toggleActiveBookings} innerText="active bookings" width="full" tail="lowercase" borderColor="primary-blue" bgColor={`${activeBookingsFilter ? "primary-blue" : "white"}`} textColor={`${activeBookingsFilter ? "white" : "primary-blue"}`} />
                      <RoundBtn clickFunc={toggleInactiveBookings} innerText="inactive bookings" width="full" tail="lowercase" borderColor="primary-blue" bgColor={`${activeBookingsFilter ? "white" : "primary-blue"}`} textColor={`${activeBookingsFilter ? "primary-blue" : "white"}`} />
                    </div>
                    {activeBookingsFilter && (
                      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                        {activeBookingsArray.slice(0, maxBookingsShown).map((booking) => (
                          <BookingCard booking={booking.venue} key={booking.id} bookingDates={{ startDate: booking.dateFrom, endDate: booking.dateTo }} bookingId={booking.id} loading={loading} setSelectedBooking={setSelectedBooking} setCancellationModal={setCancellationModal} />
                        ))}
                      </div>
                    )}
                    {inactiveBookingsFilter && (
                      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                        {inactiveBookingsArray.slice(0, maxBookingsShown).map((booking) => (
                          <BookingCard booking={booking.venue} key={booking.id} bookingDates={{ startDate: booking.dateFrom, endDate: booking.dateTo }} bookingId={booking.id} loading={loading} setSelectedBooking={setSelectedBooking} setCancellationModal={setCancellationModal} />
                        ))}
                      </div>
                    )}
                    {userBookings && userBookings.length > maxBookingsShown && (
                      <Link to={`/user/${userName}/mybookings`} className="mt-3">
                        <SquareBtn innerText="view all bookings" width="full" tail="lowercase" bgColor="" borderColor="primary-blue" textColor="primary-blue" />
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
                {userListings.length >= 1 && (
                  <div className="flex flex-col gap-2">
                    <h2 className="font-bold text-2xl md:text-3xl text-primary-green uppercase">My listings</h2>
                    <p className="text-black">{`Showing ${userListings.length < maxListingsShown ? userListings.length : maxListingsShown} of ${userListings.length} ${userListings.length > 1 ? "listings" : "listing"}`}</p>
                    {userListings && userListings.length >= 1 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                        {userListings.slice(0, maxListingsShown).map((listing) => (
                          <ListingCard key={listing.id} listing={listing} loading={loading} myListings={true} />
                        ))}
                      </div>
                    )}
                    {userListings && userListings.length > maxListingsShown && (
                      <Link to={`/user/${userName}/mylistings`} className="mt-3">
                        <SquareBtn innerText="view all listings" width="full" tail="lowercase" borderColor="primary-green" bgColor="" textColor="primary-green" />
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </section>
            {cancellationModal && <CancellationModal booking={selectedBooking} toggle={handleExitCancellation} />}
          </>
        )}
      </MainElement>
    </HelmetProvider>
  );
}
