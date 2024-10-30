import { Helmet, HelmetProvider } from "react-helmet-async";
import SingleVenue from "../../components/Venues/SingleVenue";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import { useParams } from "react-router-dom";
import { useSearchStore } from "../../stores/useSearchStore.js";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function VenueSpesific() {
  const { id } = useParams();
  const { data: singleVenueData, isLoading: singleVenueIsLoading, isError: singleVenueIsError } = useFetch(`${apiBaseUrl}/${id}`);
  const [singleVenue, setSingleVenue] = useState({});
  const { formData } = useSearchStore();

  useEffect(() => {
    if (singleVenueData && singleVenueData.data) {
      setSingleVenue(singleVenueData.data);
      console.log("singleVenueData", singleVenue);
    }
  }, [singleVenueData]);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Listing | Holidayz</title>
        {/* add listing name */}
      </Helmet>
      <main>
        <h1>Venue Spesific</h1>
        <SingleVenue />
      </main>
    </HelmetProvider>
  );
}
