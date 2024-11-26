import { useParams } from "react-router-dom";
import { useBookingDataStore, useTravelSearchStore } from "../../../stores";
import { calculateNights, formatDateForDisplay } from "../../../utils/";

export function BookingConfirmationCard() {
  const { id } = useParams();
  const { travelSearchData } = useTravelSearchStore();
  const { bookingData, bookingEmail, selectedListing } = useBookingDataStore();

  const startDate = new Date(bookingData.dateFrom);
  const formattedStartDate = formatDateForDisplay(startDate);

  const endDate = new Date(bookingData.dateTo);
  const formattedEndDate = formatDateForDisplay(endDate);

  const nights = calculateNights(bookingData.dateFrom, bookingData.dateTo);
  const price = nights * selectedListing.price;

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-x-0 top-10 flex flex-col justify-center items-center gap-4 z-30">
          <p className="text-primary-blue bg-white p-4 px-8 rounded-full text-2xl">Booking reference: {id} </p>
        </div>
        <div className="w-full h-full">
          <div className="absolute bg-black bg-opacity-20 w-full h-96 md:h-[22rem] rounded-t-lg"></div>
          <img src={selectedListing.media && selectedListing.media.length > 0 ? selectedListing.media[0].url : null} alt={selectedListing.media.length > 0 ? selectedListing.media[0].alt : null} className=" w-full h-96 md:h-[22rem] object-cover rounded-t-lg" />
        </div>
      </div>
      <div className="bg-comp-purple rounded-b-lg p-8 flex flex-col items-center gap-4">
        <h2 className="text-primary-blue text-2xl font-bold ">{selectedListing.name}</h2>
        <p className="text-center text-xl font-bold text-primary-blue">
          {formattedStartDate} - {formattedEndDate}
        </p>
        <p className="text-primary-blue">{travelSearchData.numberOfGuests} guests</p>

        <p className="font-bold text-primary-blue">SUM TOTAL: kr {price}</p>
        <p className="text-primary-blue">Booking details were sent to: {bookingEmail}</p>
      </div>
    </div>
  );
}
