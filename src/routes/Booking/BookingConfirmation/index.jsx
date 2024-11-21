import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import {useAuthStore, useSearchStore, useBookingDataStore} from "../../../stores";
import MainElement from "../../../components/MainElement/index.jsx";
import { useParams } from "react-router-dom";
import formatDateForDisplay from "../../../utils/dateUtils/formatDateForDisplay.js";
import calculateNightsBetween from "../../../utils/calcNights/calculateNightsBetween.js";
import RoundBtn from "../../../components/Buttons/RoundBtn/index.jsx";
import { Link } from "react-router-dom";

const url = import.meta.env.VITE_API_BASE_URL;

export default function BookingConfirmation() {
  const { accessToken, userName } = useAuthStore();
  const { id } = useParams();
  const { travelSearchData, selectedVenue } = useSearchStore();
  const { bookingData, setBookingData, bookingEmail } = useBookingDataStore();

  const startDate = new Date(bookingData.dateFrom);
  const formattedStartDate = formatDateForDisplay(startDate);

  const endDate = new Date(bookingData.dateTo);
  const formattedEndDate = formatDateForDisplay(endDate);

  const nights = calculateNightsBetween(bookingData.dateFrom, bookingData.dateTo);
  const price = nights * selectedVenue.price;
  // const { accessToken, userName } = useAuthStore();

  // const { setSuccessfulBookingId } = useBookingDataStore();

  // useEffect(() => {
  //   setSuccessfulBookingId("");
  // }, []);

  const navigate = useNavigate();

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Booking details | Holidayz</title>
      </Helmet>
      <MainElement>
        <h1 className="uppercase text-3xl font-bold text-center text-primary-blue mb-5">Thank you for booking with us</h1>
        <div>
          <div className="relative">
            <div className="absolute inset-x-0 top-10 flex flex-col justify-center items-center gap-4 z-30">
              <p className="text-primary-blue bg-white p-4 px-8 rounded-full text-2xl">Booking reference: {id} </p>
            </div>
            <div className="w-full h-full">
              <div className="absolute bg-black bg-opacity-20 w-full h-96 md:h-[22rem] rounded-t-lg"></div>
              <img src={selectedVenue.media && selectedVenue.media.length > 0 ? selectedVenue.media[0].url : null} alt={selectedVenue.media.length > 0 ? selectedVenue.media[0].alt : null} className=" w-full h-96 md:h-[22rem] object-cover rounded-t-lg" />
            </div>
          </div>
          <div className="bg-comp-purple rounded-b-lg p-8 flex flex-col items-center gap-4">
            <h2 className="text-primary-blue text-2xl font-bold ">{selectedVenue.name}</h2>
            <p className="text-center text-xl font-bold text-primary-blue">
              {formattedStartDate} - {formattedEndDate}
            </p>
            <p className="text-primary-blue">{travelSearchData.numberOfGuests} guests</p>

            <p className="font-bold text-primary-blue">SUM TOTAL: kr {price}</p>
            <p className="text-primary-blue">Booking details were sent to: {bookingEmail}</p>
          </div>
          <Link to="/" className="block mt-5">
            <RoundBtn innerText="Browse more stays" bgColor="primary-blue" textColor="white" />
          </Link>
        </div>
      </MainElement>
    </HelmetProvider>
  );
}
