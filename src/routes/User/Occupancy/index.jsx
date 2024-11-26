import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import MainElement from "../../../components/MainElement";
import ErrorFallback from "../../../components/ErrorFallback";
import { useApiCall } from "../../../hooks";
import { useParams } from "react-router-dom";
import { OccupancyBookingCard } from "../../../components/Cards";
import BookingCalendar from "../../../components/BookingCalendar";
import { OccupancyOverviewSkeletonLoader } from "../../../components/Loaders";
import { RoundBtn } from "../../../components/Buttons";
import { BigSpinnerLoader } from "../../../components/Loaders";

export default function Occupancy() {
  const { accessToken } = useAuthStore();
  const { loading, error, callApi } = useApiCall();
  const { id } = useParams();

  const [activeBookingsFilter, setActiveBookingsFilter] = useState(true);
  const [inactiveBookingsFilter, setInactiveBookingsFilter] = useState(false);

  const [listing, setListing] = useState(null);
  const [listingReserved, setListingReserved] = useState([]);
  const [activeBookingsArray, setActiveBookingsArray] = useState([]);
  const [inactiveBookingsArray, setInactiveBookingsArray] = useState([]);
  const [displayedActiveBookings, setDisplayedActiveBookings] = useState([]);
  const [displayedInactiveBookings, setDisplayedInactiveBookings] = useState([]);

  const navigate = useNavigate();

  const initialDisplayCount = 10;

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  useEffect(() => {
    const fetchOccupancyData = async () => {
      const result = await callApi(`/holidaze/venues/${id}?_bookings=true`);
      setListing(result.data);

      const reserved = result.data.bookings.map((booking) => ({
        startDate: new Date(booking.dateFrom),
        endDate: new Date(booking.dateTo),
      }));
      setListingReserved(reserved);

      const activeBookings = result.data.bookings.filter((booking) => new Date(booking.dateTo) > new Date());
      setActiveBookingsArray(activeBookings);

      const inactiveBookings = result.data.bookings.filter((booking) => new Date(booking.dateTo) < new Date());
      setInactiveBookingsArray(inactiveBookings);
    };

    fetchOccupancyData();
  }, []);

  useEffect(() => {
    setDisplayedActiveBookings(activeBookingsArray.slice(0, initialDisplayCount));
  }, [activeBookingsArray]);

  useEffect(() => {
    setDisplayedInactiveBookings(inactiveBookingsArray.slice(0, initialDisplayCount));
  }, [inactiveBookingsArray]);

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
        <title>{`Occupancy | ${listing && listing.name} | Holidaze`}</title>
        <meta name="description" content="Manage your property effortlessly. Check the occupancy of your listing, view booking details, and stay updated on your property's availability." />
      </Helmet>
      <MainElement>
        {loading && loading ? (
          <OccupancyOverviewSkeletonLoader />
        ) : (
          <>
            {error && <ErrorFallback errorMessage={error} />}
            {listing && (
              <div className="flex flex-col md:flex-row w-full gap-8">
                <div className="w-full xl:sticky xl:top-6 flex flex-col gap-8">
                  <div className="rounded-lg shadow-sm bg-white relative flex flex-col w-full">
                    <Link to={"/listing/" + listing.id} className="h-full w-full absolute opacity-20 z-20 rounded-lg">
                      <div className={`bg-black w-full rounded-t-lg hover:bg-opacity-0 max-h-48 md:max-h-[80rem]`}></div>
                    </Link>
                    <div className="relative">
                      <img src={listing.media.length > 0 ? listing.media[0].url : null} alt={listing.media.length > 0 ? listing.media[0].alt : null} className={`w-full max-h-48 md:max-h-[30rem] object-cover rounded-t-lg`} />
                      <p className="absolute font-bold text-2xl text-white bottom-2 right-2 z-30">kr {listing.price}/night</p>
                    </div>
                    <div className="p-4 flex flex-col gap-4">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-black hover:underline">{listing.name}</h3>
                          <p className="text-black">
                            {listing.location.city}, {listing.location.country}
                          </p>
                        </div>
                        <div>
                          <p className="text-nowrap">★ {listing.rating}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex bg-white rounded-lg justify-center border border-primary-blue">
                    <BookingCalendar reserved={listingReserved} />
                  </div>
                </div>
                {listing.bookings.length > 0 && (
                  <div className="flex flex-col gap-2 bg-comp-purple shadow-md p-8 rounded-lg w-full">
                    <h2 className="font-bold text-2xl md:text-3xl text-primary-blue uppercase ">Occupancy:</h2>
                    {activeBookingsFilter && <p className="text-black">{`Showing ${displayedActiveBookings.length < activeBookingsArray.length ? displayedActiveBookings.length : activeBookingsArray.length} of ${activeBookingsArray.length} ${activeBookingsArray.length > 1 ? "bookings" : "booking"}`}</p>}
                    {inactiveBookingsFilter && <p className="text-black">{`Showing ${displayedInactiveBookings.length < inactiveBookingsArray.length ? displayedInactiveBookings.length : inactiveBookingsArray.length} of ${inactiveBookingsArray.length} ${inactiveBookingsArray.length > 1 ? "bookings" : "booking"}`}</p>}
                    <div className="flex gap-6 my-4">
                      <RoundBtn clickFunc={toggleActiveBookings} innerText="active bookings" width="full" tailw="lowercase" bgColor={`${activeBookingsFilter ? "primary-blue" : "white"}`} textColor={`${activeBookingsFilter ? "white" : "primary-blue"}`} />
                      <RoundBtn clickFunc={toggleInactiveBookings} innerText="inactive bookings" width="full" tailw="lowercase" bgColor={`${activeBookingsFilter ? "white" : "primary-blue"}`} textColor={`${activeBookingsFilter ? "primary-blue" : "white"}`} />
                    </div>
                    {activeBookingsFilter && displayedActiveBookings.length >= 1 && (
                      <>
                        <div className="flex flex-col gap-4 w-full">
                          {displayedActiveBookings.map((booking) => (
                            <OccupancyBookingCard booking={booking} key={booking.id} />
                          ))}
                        </div>
                        {displayedActiveBookings && activeBookingsArray.length > displayedActiveBookings.length && (
                          <>
                            <button onClick={handleLoadMoreActive} className="mt-4 px-4 py-2 border border-primary-blue text-primary-blue rounded-lg w-full">
                              Load more bookings
                            </button>
                            {loadMoreLoader && <BigSpinnerLoader />}
                          </>
                        )}
                      </>
                    )}
                    {inactiveBookingsFilter && displayedInactiveBookings.length >= 1 && (
                      <>
                        <div className="flex flex-col gap-4 w-full">
                          {displayedInactiveBookings.map((booking) => (
                            <OccupancyBookingCard booking={booking} key={booking.id} active={false} />
                          ))}
                        </div>
                        {displayedInactiveBookings && inactiveBookingsArray.length > displayedInactiveBookings.length && (
                          <>
                            <button onClick={handleLoadMoreInactive} className="mt-4 px-4 py-2  border border-primary-blue text-primary-blue rounded-lg w-full">
                              Load more bookings
                            </button>
                            {loadMoreLoader && <BigSpinnerLoader />}
                          </>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </MainElement>
    </HelmetProvider>
  );
}
