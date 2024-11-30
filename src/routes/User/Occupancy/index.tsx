import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import MainElement from "../../../components/MainElement";
import GeneralErrorFallback from "../../../components/ErrorFallback/GeneralErrorFallback";
import { useApiCall } from "../../../hooks";
import { OccupancyBookingCard } from "../../../components/Cards";
import BookingCalendar from "../../../components/BookingCalendar";
import { OccupancyOverviewSkeletonLoader, BigSpinnerLoader } from "../../../components/Loaders";
import { RoundBtn } from "../../../components/Buttons";
import { ListingSpecificProps, BookingsData } from "../../../types";

export default function Occupancy(): JSX.Element {
  const { accessToken } = useAuthStore();
  const { loading, error, callApi } = useApiCall();
  const { id } = useParams();

  const [activeBookingsFilter, setActiveBookingsFilter] = useState(true);
  const [inactiveBookingsFilter, setInactiveBookingsFilter] = useState(false);

  const [listing, setListing] = useState<ListingSpecificProps | null>(null);
  const [listingReserved, setListingReserved] = useState<{ startDate: Date; endDate: Date }[]>([]);
  const [activeBookingsArray, setActiveBookingsArray] = useState<BookingsData[]>([]);
  const [inactiveBookingsArray, setInactiveBookingsArray] = useState<BookingsData[]>([]);
  const [displayedActiveBookings, setDisplayedActiveBookings] = useState<BookingsData[]>([]);
  const [displayedInactiveBookings, setDisplayedInactiveBookings] = useState<BookingsData[]>([]);
  const [loadMoreLoader, setLoadMoreLoader] = useState(false);

  const navigate = useNavigate();
  const initialDisplayCount = 10;

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  const fetchOccupancyData = async () => {
    const result = await callApi<ListingSpecific>(`/holidaze/venues/${id}?_bookings=true`);
    if (result.data) {
      setListing(result.data);

      const reserved = result.data.bookings?.map((booking) => ({
        startDate: new Date(booking.dateFrom),
        endDate: new Date(booking.dateTo),
      }));
      if (reserved) {
        setListingReserved(reserved);
      }
      const activeBookings = result.data.bookings?.filter((booking) => new Date(booking.dateTo) > new Date());
      if (activeBookings) {
        setActiveBookingsArray(activeBookings);
        if (activeBookings.length === 0) {
          setInactiveBookingsFilter(true);
          setActiveBookingsFilter(false);
        } else {
          setActiveBookingsFilter(true);
          setInactiveBookingsFilter(false);
        }
      }

      const inactiveBookings = result.data.bookings?.filter((booking) => new Date(booking.dateTo) < new Date());
      if (inactiveBookings) {
        setInactiveBookingsArray(inactiveBookings);
      }
    }
  };

  useEffect(() => {
    fetchOccupancyData();
  }, [id]);

  useEffect(() => {
    setDisplayedActiveBookings(activeBookingsArray.slice(0, initialDisplayCount));
  }, [activeBookingsArray]);

  useEffect(() => {
    setDisplayedInactiveBookings(inactiveBookingsArray.slice(0, initialDisplayCount));
  }, [inactiveBookingsArray]);

  const toggleInactiveBookings = () => {
    setActiveBookingsFilter(false);
    setInactiveBookingsFilter(true);
  };

  const toggleActiveBookings = () => {
    setActiveBookingsFilter(true);
    setInactiveBookingsFilter(false);
  };

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

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>{`Occupancy | ${listing?.name || ""} | Holidaze`}</title>
        <meta name="description" content="Manage your property effortlessly. Check the occupancy of your listing, view booking details, and stay updated on your property's availability." />
      </Helmet>
      <MainElement>
        {loading ? (
          <OccupancyOverviewSkeletonLoader />
        ) : (
          <>
            {error && <GeneralErrorFallback errorMessage={error} />}
            {listing && (
              <div className="flex flex-col md:flex-row w-full gap-8">
                <div className="w-full xl:sticky xl:top-6 flex flex-col gap-8">
                  <div className="rounded-lg shadow-sm bg-white relative flex flex-col w-full">
                    <Link to={`/listing/${listing.id}`} className="h-full w-full absolute opacity-40 z-20 rounded-lg">
                      <div className="bg-black w-full rounded-t-lg hover:bg-opacity-0 max-h-48 md:max-h-[80rem]" />
                    </Link>
                    <div className="relative">
                      <img src={listing.media[0]?.url || ""} alt={listing.media[0]?.alt || ""} className="w-full max-h-48 md:max-h-[30rem] object-cover rounded-t-lg" />
                      <p className="absolute font-bold text-2xl text-white bottom-2 right-2 z-30">kr {listing.price}/night</p>
                    </div>
                    <div className="p-4 flex flex-col gap-4">
                      <div className="flex justify-between">
                        <div>
                          <h2 className="text-xl font-bold text-black hover:underline">{listing.name}</h2>
                          <p className="text-black">
                            {listing.location.city}, {listing.location.country}
                          </p>
                        </div>
                        <div>
                          <p>★ {listing.rating}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex bg-white rounded-lg justify-center border border-primary-blue">
                    <BookingCalendar reserved={listingReserved} />
                  </div>
                </div>
                <div className="flex flex-col gap-2 bg-comp-purple shadow-md p-4 md:p-8 rounded-lg w-full">
                  <h1 className="font-bold text-2xl md:text-3xl text-primary-blue uppercase">Occupancy:</h1>
                  {activeBookingsFilter && <p className="text-black">{`Showing ${displayedActiveBookings.length} of ${activeBookingsArray.length}`}</p>}
                  {inactiveBookingsFilter && <p className="text-black">{`Showing ${displayedInactiveBookings.length} of ${inactiveBookingsArray.length}`}</p>}
                  <div className="flex gap-2 xl:gap-6 flex-col md:flex-row my-4">
                    <RoundBtn clickFunc={toggleActiveBookings} innerText="active bookings" borderColor="primary-blue" width="full" tailw="lowercase" bgColor={activeBookingsFilter ? "primary-blue" : "white"} textColor={activeBookingsFilter ? "white" : "primary-blue"} />
                    <RoundBtn clickFunc={toggleInactiveBookings} innerText="inactive bookings" borderColor="primary-blue" width="full" tailw="lowercase" bgColor={inactiveBookingsFilter ? "primary-blue" : "white"} textColor={inactiveBookingsFilter ? "white" : "primary-blue"} />
                  </div>
                  {activeBookingsFilter && (
                    <>
                      <div className="flex flex-col gap-4 w-full">
                        {displayedActiveBookings.map((booking) => (
                          <OccupancyBookingCard booking={booking} key={booking.id} />
                        ))}
                      </div>
                      {activeBookingsArray.length > displayedActiveBookings.length && (
                        <>
                          <button onClick={handleLoadMoreActive} className="mt-4 px-4 py-2 border border-primary-blue text-primary-blue rounded-lg w-full">
                            Load more bookings
                          </button>
                          {loadMoreLoader && <BigSpinnerLoader />}
                        </>
                      )}
                      {activeBookingsArray.length === 0 && <p className="text-center text-xl text-primary-blue mb-3">No active bookings</p>}
                    </>
                  )}
                  {inactiveBookingsFilter && (
                    <>
                      <div className="flex flex-col gap-4 w-full">
                        {displayedInactiveBookings.map((booking) => (
                          <OccupancyBookingCard booking={booking} key={booking.id} active={false} />
                        ))}
                      </div>
                      {inactiveBookingsArray.length > displayedInactiveBookings.length && (
                        <>
                          <button onClick={handleLoadMoreInactive} className="mt-4 px-4 py-2 border border-primary-blue text-primary-blue rounded-lg w-full">
                            Load more bookings
                          </button>
                          {loadMoreLoader && <BigSpinnerLoader />}
                        </>
                      )}
                      {inactiveBookingsArray.length === 0 && <p className="text-center text-xl text-primary-blue mb-3">No inactive bookings</p>}
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </MainElement>
    </HelmetProvider>
  );
}
