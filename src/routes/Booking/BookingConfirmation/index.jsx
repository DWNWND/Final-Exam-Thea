import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAuthStore, useBookingDataStore, useNavigationStore } from "../../../stores";
import MainElement from "../../../components/MainElement/";
import { useEffect } from "react";
import { BookingConfirmationCard } from "../../../components/Cards";
import { Link } from "react-router-dom";
import { RoundBtn } from "../../../components/Buttons";

//ADD LOADER AND ERROR HANDLING

export default function BookingConfirmation() {
  const { accessToken } = useAuthStore();
  const { successfulBookingId, selectedListing } = useBookingDataStore();
  const { clearNavigationHistory } = useNavigationStore();

  useEffect(() => {
    if (!accessToken || !successfulBookingId) {
      navigate("/");
    }
  }, [accessToken]);

  useEffect(() => {
    clearNavigationHistory();
  }, []);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>{`Booking Confirmation | ${selectedListing.name && selectedListing.name} | Holidaze`}</title>
        <meta name="description" content="Booking successful! Thank you for booking with Holidaze." />
      </Helmet>
      <MainElement>
        <h1 className="uppercase text-3xl font-bold text-center text-primary-blue mb-5">Thank you for booking with us</h1>
        <BookingConfirmationCard />
        <Link to="/" className="block mt-5">
          <RoundBtn innerText="Browse more stays" bgColor="primary-blue" textColor="white" />
        </Link>
      </MainElement>
    </HelmetProvider>
  );
}
