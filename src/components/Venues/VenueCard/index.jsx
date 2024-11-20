import ArrowRightBtn from "../../Buttons/ArrowRightBtn";
import SquareBtn from "../../Buttons/SquareBtn";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import { useEffect, useState } from "react";
import formatDateForDisplay from "../../../utils/dateUtils/formatDateForDisplay.js";

export default function VenueCard({ venue, bookingId, bookingDates = null, loading, myVenues = false, myBookings = false, setSelectedBooking = () => {}, setCancellationModal = () => {} }) {
  const { userName, venueManager } = useAuthStore();
  const [inactiveBooking, setInactiveBooking] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(false);
  const [checkOutToday, setCheckOutToday] = useState(false);

  function cancelBookingPrompt() {
    setSelectedBooking({ name: venue.name, id: bookingId });
    setCancellationModal(true);
  }

  useEffect(() => {
    if (bookingDates) {
      const checkIfBookingIsInThePast = () => {
        const todayString = formatDateForDisplay(new Date());
        const { startDate, endDate } = bookingDates;
        // Determine if dates are in the past or if endDate is today
        const startDateInPast = startDate && new Date(startDate) < new Date(todayString);
        const endDateInPast = endDate && new Date(endDate) < new Date(todayString);
        const endDateIsToday = endDate && new Date(endDate).toDateString() === new Date(todayString).toDateString();
        if (startDateInPast && endDateInPast) {
          // Both startDate and endDate are in the past
          setInactiveBooking(true);
          console.log("booking in the past");
        }
        if (startDateInPast) {
          // Only startDate is in the past
          setCurrentBooking(true);
          console.log("Only startDate in the past");
        }
        if (endDateIsToday) {
          // EndDate is today
          setCheckOutToday(true);
          console.log("endDate is today");
        } else {
          console.log("bookings are active");
          // No dates are in the past
        }
      };
      checkIfBookingIsInThePast();
    }
  }, [bookingDates]);

  if (loading) {
    return (
      <div className="rounded-lg shadow-sm bg-white relative flex flex-col">
        <div className="animate-pulse">
          <div className="h-48 bg-comp-gray rounded-t-lg"></div>
          <div className="p-4 flex flex-col gap-4 ">
            <div className="h-6 bg-comp-gray rounded w-3/4"></div>
            <div className="h-4 bg-comp-gray rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {venue && (
        <div key={venue.id} className="rounded-lg shadow-sm bg-white hover:shadow-lg transition duration-300 ease-in-out relative flex flex-col">
          <Link to={"/venue/" + venue.id} className="h-48 w-full absolute z-30 rounded-lg"></Link>
          <div className="bg-black w-full rounded-t-lg h-48 z-20 opacity-20 absolute"></div>
          <div className="relative">
            <ArrowRightBtn href={"/venue/" + venue.id} myVenues={myVenues} myBookings={myBookings} tailw="z-30" />
            <img src={venue.media.length > 0 ? venue.media[0].url : null} alt={venue.media.length > 0 ? venue.media[0].alt : null} className={`w-full h-48 object-cover rounded-t-lg`} />
            {bookingDates && (
              <p className="absolute w-full text-center bottom-20 text-4xl font-bold text-white z-20">
                {formatDateForDisplay(bookingDates.startDate)} - {formatDateForDisplay(bookingDates.endDate)}
              </p>
            )}
            <p className="absolute font-bold text-2xl text-white bottom-2 right-2 z-30">kr {venue.price}/night</p>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <div className="flex justify-between cursor-default">
              <div>
                <h3 className="text-xl font-bold text-black">{venue.name}</h3>
                <p className="text-black">
                  {venue.location.city}, {venue.location.country}
                </p>
              </div>
              <div>
                <p className="text-nowrap text-primary-blue">★ {venue.rating}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              {myVenues && !myBookings && (
                <>
                  <Link to={`${venueManager ? `/user/${userName}/occupancy/${venue.id}` : ""}`} className="z-40">
                    <SquareBtn innerText={`${venue.bookings.length >= 1 ? "Check occupancy" : "this property has no bookings yet"}`} tailw={`${venue.bookings.length < 1 && "hover:shadow-none cursor-default"} lowercase`} borderColor={venue.bookings.length >= 1 ? "primary-green" : "none"} width="full" bgColor="white" textColor="primary-green" disabled={venue.bookings.length < 1} />
                  </Link>
                  <Link to={`${venueManager ? `/user/${userName}/edit/${venue.id}` : ""}`} className="z-40">
                    <SquareBtn innerText={venueManager ? "Edit listing" : "Register as venue manager to edit listing"} borderColor={venueManager ? "primary-green" : "none"} disabled={!venueManager} width="full" tailw={`${!venueManager && "hover:shadow-none cursor-default"} lowercase`} bgColor="white" textColor="primary-green" />
                  </Link>
                </>
              )}
              {!myVenues && myBookings && (
                <>
                  {inactiveBooking && <p>This booking is inactive</p>}
                  {currentBooking && <p>Your current stay</p>}
                  {checkOutToday && <p>Check out today</p>}
                  {!inactiveBooking && !currentBooking && !checkOutToday && <SquareBtn clickFunc={cancelBookingPrompt} innerText="Cancel booking" width="full" tailw="lowercase z-40" bgColor="primary-blue" textColor="white" borderColor="primary-blue" />}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
