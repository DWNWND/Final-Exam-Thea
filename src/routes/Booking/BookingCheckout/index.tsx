import { Helmet, HelmetProvider } from "react-helmet-async";
import CheckoutForm from "../../../components/Forms/TravelBooking/CheckoutForm";
import MainElement from "../../../components/MainElement";
import { useEffect } from "react";
import { useAuthStore, useBookingDataStore } from "../../../stores";
import { useNavigate } from "react-router-dom";

export default function BookingCheckout(): JSX.Element {
  const { accessToken } = useAuthStore();
  const { bookingData, selectedListing } = useBookingDataStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken || !bookingData.venueId) {
      navigate("/");
    }
  }, [accessToken, bookingData]);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>{`Booking Checkout | ${selectedListing.name && selectedListing.name} | Holidaze`}</title>
        <meta name="description" content="Checkout to secure your room." />
      </Helmet>
      <MainElement tail="flex justify-center">
        <CheckoutForm />
      </MainElement>
    </HelmetProvider>
  );
}
