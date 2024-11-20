import { Helmet, HelmetProvider } from "react-helmet-async";
import useAuthStore from "../../../stores/useAuthStore.js";
import { useSearchStore } from "../../../stores/useSearchStore.ts";
import formatDateForDisplay from "../../../utils/dateUtils/formatDateForDisplay.js";
import claculateNightsBetween from "../../../utils/calcNights/claculateNightsBetween.js";
import { Link } from "react-router-dom";
import RoundBtn from "../../../components/Buttons/RoundBtn/index.jsx";
import MainElement from "../../../components/MainElement/index.jsx";

export default function BookingSummary() {
  const { accessToken, userName } = useAuthStore();
  const { travelSearchData, selectedVenue } = useSearchStore();

  const startDate = new Date(travelSearchData.travelDates.startDate);
  const formattedStartDate = formatDateForDisplay(startDate);

  const endDate = new Date(travelSearchData.travelDates.endDate);
  const formattedEndDate = formatDateForDisplay(endDate);

  const nights = claculateNightsBetween(travelSearchData.travelDates.startDate, travelSearchData.travelDates.endDate);
  const price = nights * selectedVenue.price;

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Booking summary | Holidayz</title>
      </Helmet>
      <MainElement tailw="relative flex flex-col gap-4">
        <h1 className="uppercase text-3xl font-bold text-center text-primary-blue">Booking Summary</h1>
        <div>
          <div className="relative">
            <div className="absolute inset-x-0 bottom-4 flex flex-col justify-center items-center gap-4 z-30">
              <h2 className="text-center text-2xl font-bold text-white">
                {formattedStartDate} - {formattedEndDate}
              </h2>
            </div>
            <div className="w-full h-full">
              <div className="absolute bg-black bg-opacity-20 w-full h-96 md:h-[22rem] rounded-t-lg"></div>
              <img src={selectedVenue.media && selectedVenue.media.length > 0 ? selectedVenue.media[0].url : null} alt={selectedVenue.media.length > 0 ? selectedVenue.media[0].alt : null} className=" w-full h-96 md:h-[22rem] object-cover rounded-t-lg" />
            </div>
          </div>
          <div className="bg-comp-purple rounded-b-lg p-8 flex flex-col items-center gap-4">
            <h2 className="text-primary-blue text-2xl font-bold ">{selectedVenue.name}</h2>
            <p className="text-primary-blue">{travelSearchData.numberOfGuests} guests</p>
            <div className="rounded-full font-bold p-4 px-6 bg-white text-primary-blue flex items-center justify-center w-auto">
              SUM TOTAL: kr {price} ({nights} {nights > 1 ? "nights" : "night"})
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Link to={accessToken ? `/booking/details` : "/login"}>
            <RoundBtn innerText={accessToken ? `Continue as ${userName}` : "Login"} bgColor="primary-green" textColor="white" />
          </Link>
          {!accessToken && (
            <Link to="/booking/details">
              <RoundBtn innerText="Continue as guest" bgColor="white" textColor="primary-green" />
            </Link>
          )}
        </div>
      </MainElement>
    </HelmetProvider>
  );
}
