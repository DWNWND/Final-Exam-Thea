import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from "../../../stores";
import MainElement from "../../../components/MainElement/index.jsx";
import ListVenues from "../../../components/User/ListVenues/index.jsx";
import useAuthedFetch from "../../../hooks/useAuthedFetch.jsx";
import { useState } from "react";

export default function MyListings() {
  const { accessToken, userName } = useAuthStore();
  const navigate = useNavigate();
  const [userVenues, setUserVenues] = useState([]);
  const { loading: loadingInFetch, error: errorInFetch, fetchWithAuthentication } = useAuthedFetch(accessToken);

  const fetchVenues = async () => {
    const response = await fetchWithAuthentication(`/holidaze/profiles/${userName}/venues?_bookings=true`);
    setUserVenues(response.data);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    } else {
      fetchVenues();
    }
  }, [accessToken]);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>My listings | Holidayz</title>
      </Helmet>
      <MainElement>
        {errorInFetch && <p className="text-danger text-center">We encountered an unexpected issue while processing your request. Please try again later. If the problem persists, contact our support team.</p>}
        {userVenues.length > 1 && <ListVenues venues={userVenues} maxVenuesShown="4" loading={loadingInFetch} />}
      </MainElement>
    </HelmetProvider>
  );
}
