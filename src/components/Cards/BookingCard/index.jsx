import { ArrowRightBtn, SquareBtn } from "../../Buttons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDateForDisplay } from "../../../utils/";
import { ListingCardSkeletonLoader } from "../../Loaders";

export function BookingCard({ booking, bookingId, bookingDates = null, loading, setSelectedBooking, setCancellationModal = () => {} }) {
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
      {loading && <ListingCardSkeletonLoader />}
      {booking && (
        <div key={booking.id} className="rounded-lg shadow-sm bg-white hover:shadow-lg transition duration-300 ease-in-out relative flex flex-col">
          <Link to={"/listing/" + booking.id} className="h-48 w-full absolute z-30 rounded-lg"></Link>
          <div className="bg-black w-full rounded-t-lg h-48 z-20 opacity-20 absolute"></div>
          {inactiveBooking && <div className="absolute w-full h-full bg-comp-gray opacity-40 rounded-lg z-30 transition duration-300 ease-in-out hover:opacity-0"></div>}
          {currentBooking && <div className="bg-black w-full rounded-t-lg h-48 z-20 opacity-20 absolute"></div>}
          <div className="relative">
            <ArrowRightBtn href={"/listing/" + booking.id} booking={true} tailw={`z-30 ${inactiveBooking && "opacity-60"}`} />
            <img src={booking.media.length > 0 ? booking.media[0].url : null} alt={booking.media.length > 0 ? booking.media[0].alt : null} className={`w-full h-48 object-cover rounded-t-lg`} />
            {checkOutToday ? (
              <p className="absolute w-full text-center bottom-20 text-3xl font-bold text-danger z-20 uppercase">Check out today</p>
            ) : (
              <>
                {inactiveBooking ? (
                  <>
                    <p className="absolute w-full text-center bottom-24 text-3xl font-bold text-white z-20 uppercase">Inactive</p>
                    <p className="absolute w-full text-center bottom-16 text-lg font-bold text-white z-20 italic">
                      {formatDateForDisplay(bookingDates.startDate)} - {formatDateForDisplay(bookingDates.endDate)}
                    </p>
                  </>
                ) : (
                  <>
                    {bookingDates && (
                      <>
                        {currentBooking ? (
                          <>
                            <p className="absolute w-full text-center bottom-24 text-3xl font-bold text-white z-20 uppercase">Current stay</p>
                            <p className="absolute w-full text-center bottom-16 text-lg font-bold text-white z-20 italic">
                              {formatDateForDisplay(bookingDates.startDate)} - {formatDateForDisplay(bookingDates.endDate)}
                            </p>
                          </>
                        ) : (
                          <p className="absolute w-full text-center bottom-20 text-3xl font-bold text-white z-20">
                            {formatDateForDisplay(bookingDates.startDate)} - {formatDateForDisplay(bookingDates.endDate)}
                          </p>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
            <p className="absolute font-bold text-2xl text-white bottom-2 right-2 z-20">kr {booking.price}/night</p>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex justify-between cursor-default">
              <div>
                <h3 className="text-xl font-bold text-black">{booking.name}</h3>
                <p className="text-black">
                  {booking.location.city}, {booking.location.country}
                </p>
              </div>
              <div>
                <p className="text-nowrap text-primary-blue">★ {booking.rating}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 ">{!inactiveBooking && !currentBooking && !checkOutToday && <SquareBtn clickFunc={cancelBookingPrompt} innerText="Cancel booking" width="full" tailw="lowercase z-40" bgColor="white" textColor="primary-blue" borderColor="primary-blue" />}</div>
          </div>
        </div>
      )}
    </>
  );
}
