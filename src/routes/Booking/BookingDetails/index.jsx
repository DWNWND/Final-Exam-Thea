import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import DetailsForm from "../../../components/Forms/Booking/DetailsForm";
import MainElement from "../../../components/MainElement/index.jsx";
import { useEffect } from "react";
import { useBookingDataStore } from "../../../stores";

export default function BookingDetails() {
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
        <title>{`Booking Details | ${selectedVenue.name && selectedVenue.name} | Holidaze`}</title>
        <meta name="description" content="Book your next stay with Holidaze." />
      </Helmet>
      <MainElement tailw="flex justify-center">
        <DetailsForm />
      </MainElement>
    </HelmetProvider>
  );
}
