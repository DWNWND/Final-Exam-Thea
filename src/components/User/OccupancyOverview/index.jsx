import { Link } from "react-router-dom";
import { formatDateForDisplay } from "../../../utils/";
import { useEffect, useState } from "react";
import BookingCalendar from "../../BookingCalendar";
import { useParams } from "react-router-dom";
import { OccupancyOverviewSkeletonLoader } from "../../Loaders";
import ErrorFallback from "../../ErrorFallback";
import { useApiCall } from "../../../hooks";

export default function OccupancyOverview({ setListingName }) {
  const { id } = useParams();
  const { loading, error, callApi } = useApiCall();
  const [listing, setListing] = useState(null);
  const [listingReserved, setListingReserved] = useState([]);

  useEffect(() => {
    const fetchOccupancyData = async () => {
      const result = await callApi(`/holidaze/venues/${id}?_bookings=true`);
      setListing(result.data);
      setListingName(result.data.name);

      const reserved = result.data.bookings.map((booking) => ({
        startDate: new Date(booking.dateFrom),
        endDate: new Date(booking.dateTo),
      }));
      setListingReserved(reserved);
    };

    fetchOccupancyData();
  }, []);

  return (
    <>
      {loading && loading ? (
        <OccupancyOverviewSkeletonLoader />
      ) : (
        <>
          {error && <ErrorFallback errorMessage={error} />}
          {listing && (
            <div className="flex flex-col md:flex-row w-full gap-8">
              <div className="w-full xl:sticky xl:top-6 flex flex-col gap-8">
                <div className="rounded-lg shadow-sm bg-white relative flex flex-col w-full">
                  <Link to={"/venue/" + listing.id} className="h-full w-full absolute opacity-20 z-20 rounded-lg">
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
              <div className="w-full">
                <h2 className=" mb-3 uppercase text-xl text-primary-green">Bookings:</h2>
                <p className="text-black mb-3">{`${listing.bookings.length === 0 ? "This property have no upcoming bookings" : `Showing ${listing.bookings.length} of ${listing.bookings.length} ${listing.bookings.length > 1 ? "bookings" : "booking"}`}`}</p>
                <div className="flex flex-col gap-4 w-full">
                  {listing.bookings.map((booking) => (
                    <div key={booking.id} className="bg-white rounded-lg shadow-sm">
                      <div className="rounded-t-lg px-4 py-6  bg-primary-green">
                        <p className="mb-4 text-center text-2xl font-bold  text-white">
                          {formatDateForDisplay(booking.dateFrom)} - {formatDateForDisplay(booking.dateTo)}
                        </p>
                      </div>
                      <div className="p-6 flex flex-col gap-3">
                        <div>
                          <p>Name on booking:</p>
                          <p className="text-lg text-primary-dark">{booking.customer.name}</p>
                        </div>
                        <div>
                          <p className="">Contact information:</p>
                          <p className="text-lg text-primary-dark">{booking.customer.email}</p>
                        </div>
                        <div>
                          <p>Number of guests:</p>
                          <p className="text-lg text-primary-dark">{booking.guests}</p>
                        </div>
                      </div>
                      <div className="bg-comp-green p-6 rounded-b-lg text-primary-green">
                        <p className="">Booking reference:</p>
                        <p className="font-bold">{booking.id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
