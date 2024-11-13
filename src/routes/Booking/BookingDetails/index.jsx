import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore.js";
import DetailsForm from "../../../components/Forms/Booking/DetailsForm";
import MainElement from "../../../components/MainElement/index.jsx";

export default function BookingDetails() {
  const { accessToken, userName } = useAuthStore();
  const navigate = useNavigate();

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Booking details | Holidayz</title>
      </Helmet>
      <MainElement tailw="flex justify-center">
        <DetailsForm />
      </MainElement>
    </HelmetProvider>
  );
}
