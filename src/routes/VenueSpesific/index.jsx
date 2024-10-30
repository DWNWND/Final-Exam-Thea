import { Helmet, HelmetProvider } from "react-helmet-async";
import SingleVenue from "../../components/Venues/SingleVenue";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import { useParams } from "react-router-dom";
import { useSearchStore } from "../../stores/useSearchStore.js";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function VenueSpesific() {
  const { id } = useParams();
  const { data: singleVenueData, isLoading: singleVenueIsLoading, isError: singleVenueIsError } = useFetch(`${apiBaseUrl}/${id}?_bookings=true&_owner=true`);
  const [singleVenue, setSingleVenue] = useState({});
  const { formData } = useSearchStore();

  useEffect(() => {
    if (singleVenueData && singleVenueData.data) {
      setSingleVenue(singleVenueData.data);
      console.log("singleVenue VenueSpecific comp", singleVenue);
    }
  }, [singleVenueData]);

  const isNotEmpty = (obj) => Object.keys(obj).length > 0;
  const onlyRenderWhenSet = isNotEmpty(singleVenue);

  return (
    <>
      {onlyRenderWhenSet && (
        <HelmetProvider>
          <Helmet prioritizeSeoTags>
            <meta name="description" content="" />
            <title> {singleVenue.name} | Holidayz</title>
            {/* add Venue title */}
          </Helmet>
          <main className="p-4">
            <SingleVenue venue={singleVenue} formData={formData} />
          </main>
        </HelmetProvider>
      )}
    </>
  );
}
