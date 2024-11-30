import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRightBtn, SquareBtn } from "../../Buttons";
import { formatDateForDisplay } from "../../../utils";
import { ListingCardSkeletonLoader } from "../../Loaders";
import { DateRange, BookingSpecificListing } from "../../../types";

interface BookingCardCompProps {
  booking: BookingSpecificListing;
  bookingId: string;
  bookingDates?: DateRange | null;
  loading: boolean;
  setSelectedBooking: (booking: { name: string; id: string }) => void;
  setCancellationModal?: (value: boolean) => void;
}

export function BookingCard({ booking, bookingId, bookingDates = null, loading, setSelectedBooking, setCancellationModal = () => {} }: BookingCardCompProps): JSX.Element {
  const [inactiveBooking, setInactiveBooking] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(false);
  const [checkOutToday, setCheckOutToday] = useState(false);

  const cancelBookingPrompt = () => {
    setSelectedBooking({ name: booking.name, id: bookingId });
    setCancellationModal(true);
  };

  useEffect(() => {
    if (bookingDates) {
      const checkIfBookingIsInThePast = () => {
        const today = new Date();
        const { startDate, endDate } = bookingDates;

        const startDateInPast = startDate && new Date(startDate) < today;
        const endDateInPast = endDate && new Date(endDate) < today;
        const endDateIsToday = endDate && new Date(endDate).toDateString() === today.toDateString();

        if (startDateInPast && endDateInPast && !endDateIsToday) {
          setInactiveBooking(true);
        }
        if (startDateInPast && !endDateInPast) {
          setCurrentBooking(true);
        }
        if (startDateInPast && endDateIsToday) {
          setCheckOutToday(true);
        } else if (!startDateInPast && !endDateInPast && !endDateIsToday) {
          setInactiveBooking(false);
          setCurrentBooking(false);
          setCheckOutToday(false);
        }
      };
      checkIfBookingIsInThePast();
    }
  }, [bookingDates]);

  return (
    <>
      {loading ? (
        <ListingCardSkeletonLoader />
      ) : (
        <>
          {booking && (
            <div className="rounded-lg shadow-sm bg-white hover:shadow-lg transition duration-300 ease-in-out relative flex flex-col">
              <ArrowRightBtn href={`/listing/${booking.id}`} booking={true} tail={`z-40 ${inactiveBooking && "opacity-60"}`} />
              <Link to={`/listing/${booking.id}`} className="h-48 w-full z-30 rounded-lg">
                <div className="bg-black w-full rounded-t-lg h-48 z-20 opacity-40 absolute"></div>
                {inactiveBooking && <div className="absolute w-full h-full bg-comp-gray opacity-40 rounded-lg z-20 transition duration-300 ease-in-out hover:opacity-0"></div>}
                {currentBooking && <div className="bg-black w-full rounded-t-lg h-48 z-20 opacity-20 absolute"></div>}
                <div className="relative">
                  <img src={booking.media.length > 0 ? booking.media[0].url : ""} alt={booking.media.length > 0 ? booking.media[0].alt : ""} className="w-full h-48 object-cover rounded-t-lg" />
                  {bookingDates && (
                    <>
                      {checkOutToday && <p className="absolute w-full text-center bottom-20 text-3xl font-bold text-danger z-20 uppercase">Check out today</p>}
                      {inactiveBooking && (
                        <div className="absolute w-full text-center bottom-16 z-20 bg-primary-blue bg-opacity-70 py-2">
                          <p className="text-3xl uppercase font-bold text-white">Inactive</p>
                          <p className="text-lg italic font-bold text-white">
                            {formatDateForDisplay(bookingDates.startDate)} - {formatDateForDisplay(bookingDates?.endDate || "")}
                          </p>
                        </div>
                      )}
                      {currentBooking && (
                        <div className="absolute w-full text-center bottom-16 z-20 bg-primary-blue py-2">
                          <p className="text-3xl font-bold text-white uppercase">Current stay</p>
                          <p className="text-lg font-bold text-white italic">
                            {formatDateForDisplay(bookingDates.startDate)} - {formatDateForDisplay(bookingDates.endDate)}
                          </p>
                        </div>
                      )}
                      {!inactiveBooking && !currentBooking && !checkOutToday && (
                        <p className="absolute w-full text-center bottom-20 text-3xl font-bold text-white z-20 bg-primary-blue py-2">
                          {formatDateForDisplay(bookingDates.startDate)} - {formatDateForDisplay(bookingDates.endDate)}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </Link>
              <div className="p-4 flex flex-col gap-4">
                <div className="flex justify-between cursor-default">
                  <div>
                    <h3 className="text-xl font-bold text-black">{booking.name}</h3>
                    <p className="text-black">
                      {booking.location.city}, {booking.location.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-nowrap">★ {booking.rating}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">{!inactiveBooking && !currentBooking && !checkOutToday && <SquareBtn clickFunc={cancelBookingPrompt} innerText="Cancel booking" width="full" tail="lowercase z-40" bgColor="white" textColor="primary-blue" borderColor="primary-blue" />}</div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
