import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../../stores/useAuthStore.js';

export default function MyListings() {
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
      <title>Booking Success | Holidayz</title>
    </Helmet>
    <div>
      <h1>My Listings</h1>
    </div>
    </HelmetProvider>
  );
}
