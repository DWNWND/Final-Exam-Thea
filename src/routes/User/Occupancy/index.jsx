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
        <title>{`Occupancy | ${listingName && listingName} | Holidaze`}</title>
        <meta name="description" content="Manage your property effortlessly. Check the occupancy of your listing, view booking details, and stay updated on your property's availability." />
      </Helmet>
      <MainElement>
        <OccupancyOverview setListingName={setListingName} />
      </MainElement>
    </HelmetProvider>
  );
}
