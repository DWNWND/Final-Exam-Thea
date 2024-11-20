import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import MainElement from "../../../components/MainElement/index.jsx";
import OccupancyOverview from "../../../components/User/OccupancyOverview/index.jsx";

export default function Occupancy() {
  const { accessToken } = useAuthStore();
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
        <title>My Bookings | Holidayz</title>
      </Helmet>
      <MainElement>
        <OccupancyOverview />
      </MainElement>
    </HelmetProvider>
  );
}
