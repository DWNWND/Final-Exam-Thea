import { Helmet, HelmetProvider } from "react-helmet-async";
import CheckoutForm from "../../../components/Forms/Booking/CheckoutForm";
import MainElement from "../../../components/MainElement";
import { useEffect } from "react";
import { useAuthStore } from "../../../stores";
import { useNavigate } from "react-router-dom";
import { useBookingDataStore } from "../../../stores";

export default function BookingCheckout() {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  const { bookingData, selectedVenue } = useBookingDataStore();

  useEffect(() => {
    if (!accessToken || !bookingData.venueId) {
      navigate("/");
    }
  }, [accessToken]);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>{`Booking Checkout | ${selectedVenue.name && selectedVenue.name} | Holidaze`}</title>
      </Helmet>
      <MainElement tailw="flex justify-center">
        <CheckoutForm />
      </MainElement>
    </HelmetProvider>
  );
}
