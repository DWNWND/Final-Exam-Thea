import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import DetailsForm from "../../../components/Forms/TravelBooking/DetailsForm";
import MainElement from "../../../components/MainElement";
import { useEffect } from "react";
import { useBookingDataStore } from "../../../stores";

export default function BookingDetails(): JSX.Element {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  const { bookingData, selectedListing } = useBookingDataStore();

  useEffect(() => {
    if (!accessToken || !bookingData.venueId) {
      navigate("/");
    }
  }, []);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>{`Booking Details | ${selectedListing.name && selectedListing.name} | Holidaze`}</title>
        <meta name="description" content="Book your next stay with Holidaze." />
      </Helmet>
      <MainElement tailw="flex justify-center">
        <DetailsForm />
      </MainElement>
    </HelmetProvider>
  );
}
