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
        <title>{`My Bookings | ${userName} | Holidaze`}</title>
        <meta name="description" content="View all your Holidaze bookings." />
      </Helmet>
      <MainElement>
        <ListOfBookings />
      </MainElement>
    </HelmetProvider>
  );
}
