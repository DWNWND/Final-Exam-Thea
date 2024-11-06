import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore.js";

export default function BookingConfirmation() {
  const { accessToken, userName } = useAuthStore();
  const navigate = useNavigate();

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Booking details | Holidayz</title>
      </Helmet>
      <main className="pt-20 p-4"></main>
    </HelmetProvider>
  );
}
