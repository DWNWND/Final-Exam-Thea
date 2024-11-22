import { Helmet, HelmetProvider } from "react-helmet-async";
import { useAuthStore, useBookingDataStore, useNavigationStore } from "../../../stores";
import MainElement from "../../../components/MainElement/index.jsx";
import { useEffect } from "react";
import BookingConfirmationMessage from "../../../components/BookingConfirmationMessage/index.jsx";

export default function BookingConfirmation() {
  const { accessToken } = useAuthStore();
  const { successfulBookingId, selectedVenue } = useBookingDataStore();
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
        <meta name="description" content="" />
        <title>{`Booking Confirmation | ${selectedVenue.name && selectedVenue.name} | Holidaze`}</title>
      </Helmet>
      <MainElement>
        <BookingConfirmationMessage />
      </MainElement>
    </HelmetProvider>
  );
}
