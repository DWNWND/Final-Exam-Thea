import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import MainElement from "../../../components/MainElement/index.jsx";
import ListOfListings from "../../../components/User/ListOfListings/index.jsx";

export default function MyListings() {
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
        <title>{`My Listings | ${userName} | Holidaze`}</title>
        <meta name="description" content="View all your pubilshed Holidaze listings." />
      </Helmet>
      <MainElement>
        <ListOfListings />
      </MainElement>
    </HelmetProvider>
  );
}
