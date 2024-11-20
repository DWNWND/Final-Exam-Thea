import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import MainElement from "../../../components/MainElement/index.jsx";
import ListOfBookings from "../../../components/User/ListOfBookings/index.jsx";

export default function MyBookings() {
  const { accessToken, userName } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>My Bookings | {userName} | Holidayz</title>
      </Helmet>
      <MainElement>
        <ListOfBookings />
      </MainElement>
    </HelmetProvider>
  );
}
