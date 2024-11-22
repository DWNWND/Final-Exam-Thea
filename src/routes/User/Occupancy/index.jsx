import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import MainElement from "../../../components/MainElement/index.jsx";
import OccupancyOverview from "../../../components/User/OccupancyOverview/index.jsx";

export default function Occupancy() {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  const [listingName, setListingName] = useState("");

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>{`Occupancy | ${listingName && listingName} | Holidaze`}</title>
      </Helmet>
      <MainElement>
        <OccupancyOverview setListingName={setListingName} />
      </MainElement>
    </HelmetProvider>
  );
}
