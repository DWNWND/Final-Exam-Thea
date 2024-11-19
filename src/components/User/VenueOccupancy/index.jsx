import { Link } from "react-router-dom";
import formatDateForDisplay from "../../../utils/dateUtils/formatDateForDisplay";
import { useEffect, useState } from "react";
import BookingCalendar from "../../BookingCalendar";
import SquareBtn from "../../Buttons/SquareBtn";

export default function VenueOccupancy({ listing, setSelectedBooking, setCancellationModal }) {
  const [bookingReserved, setBookingReserved] = useState([]);

  useEffect(() => {
    const reserved = listing.bookings.map((booking) => ({
      startDate: new Date(booking.dateFrom),
      endDate: new Date(booking.dateTo),
    }));

    setBookingReserved(reserved);
  }, [listing]);

  //this functionality is not allowed by the api - you can only delete bookings that you are the owner of....
  function cancelBookingPrompt(booking) {
    setSelectedBooking({ id: booking.id, dateFrom: formatDateForDisplay(booking.dateFrom), dateTo: formatDateForDisplay(booking.dateTo), customer: booking.customer.name });
    console.log("canceling booking...", booking.id);
    setCancellationModal(true);
  }

  return (
    <>
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
              <BookingCalendar reserved={bookingReserved} />
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
                    <SquareBtn clickFunc={cancelBookingPrompt} funcProp={booking} innerText="Cancel booking" width="full" tailw="lowercase z-40" bgColor="comp-green" textColor="primary-green" borderColor="primary-green" />
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
  );
}

// import ArrowRightBtn from "../../Buttons/ArrowRightBtn";
// import SquareBtn from "../../Buttons/SquareBtn";
// import { Link } from "react-router-dom";
// import useAuthStore from "../../../stores/useAuthStore";
// import { useEffect, useState } from "react";

// export default function VenueCard({ venue, bookingId, loading, myVenues = false, myBookings = false, setSelectedBooking = () => {}, setCancellationModal = () => {} }) {
//   const { userName, venueManager } = useAuthStore();

//   function cancelBookingPrompt() {
//     setSelectedBooking({ name: venue.name, id: bookingId });
//     console.log("canceling booking...", bookingId, venue.name);
//     setCancellationModal(true);
//   }

//   if (loading) {
//     return (
//       <div className="rounded-lg shadow-sm bg-white relative flex flex-col">
//         <div className="animate-pulse">
//           <div className="h-48 bg-comp-gray rounded-t-lg"></div>
//           <div className="p-4 flex flex-col gap-4 ">
//             <div className="h-6 bg-comp-gray rounded w-3/4"></div>
//             <div className="h-4 bg-comp-gray rounded w-1/2"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {venue && (
//         <div className="rounded-lg shadow-sm bg-white hover:shadow-lg transition duration-300 ease-in-out relative flex flex-col">
//           <Link to={"/venue/" + venue.id} className="h-full w-full absolute opacity-20 hover:opacity-0  transition duration-300 ease-in-out z-20 rounded-lg">
//             <div className={`bg-black w-full rounded-t-lg hover:bg-opacity-0 h-48`}></div>
//           </Link>
//           <div className="relative">
//             <ArrowRightBtn href={"/venue/" + venue.id} myVenues={myVenues} myBookings={myBookings} tailw="z-30" />
//             <img src={venue.media.length > 0 ? venue.media[0].url : null} alt={venue.media.length > 0 ? venue.media[0].alt : null} className={`w-full h-48 object-cover rounded-t-lg`} />
//             <p className="absolute font-bold text-2xl text-white bottom-2 right-2 z-30">kr {venue.price}/night</p>
//           </div>
//           <div className="p-4 flex flex-col gap-4">
//             <div className="flex justify-between">
//               <div>
//                 <h3 className="text-xl font-bold text-black hover:underline">{venue.name}</h3>
//                 <p className="text-black">
//                   {venue.location.city}, {venue.location.country}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-nowrap">★ {venue.rating}</p>
//               </div>
//             </div>
//             <div className="flex flex-col gap-2 ">
//               {/* fix these links */}
//               {myVenues && !myBookings && (
//                 <>
//                   /user/:username/occupancy/:id"
//                   <Link to={`${venueManager ? `/user/${userName}/occupancy/${venue.id}` : ""}`} className="z-40">
//                     <SquareBtn innerText="Check occupancy" width="full" tailw="lowercase" bgColor="white" textColor="primary-green" />
//                   </Link>
//                   <Link to={`${venueManager ? `/user/${userName}/edit/${venue.id}` : ""}`} className="z-40">
//                     <SquareBtn innerText={venueManager ? "Edit listing" : "Register as venue manager to edit listing"} borderColor={venueManager ? "primary-green" : "none"} disabled={!venueManager} width="full" tailw={`${!venueManager && "hover:shadow-none cursor-default"} lowercase`} bgColor="white" textColor="primary-green" />
//                   </Link>
//                 </>
//               )}
//               {!myVenues && myBookings && <SquareBtn clickFunc={cancelBookingPrompt} innerText="Cancel booking" width="full" tailw="lowercase z-40" bgColor="white" textColor="primary-blue" borderColor="primary-blue" />}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
