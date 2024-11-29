import { Helmet, HelmetProvider } from "react-helmet-async";
import SingleVenue from "../../components/Venues/SingleVenue";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import { useParams } from "react-router-dom";
import { useSearchStore } from "../../stores/useSearchStore.js";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

//think about using sceleton loaders
function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-blue border-gray-200"></div>
    </div>
  );
}

export default function VenueSpesific() {
  const { id } = useParams();
  const { data: singleVenueData, isLoading: singleVenueIsLoading, isError: singleVenueIsError } = useFetch(`${apiBaseUrl}/holidaze/venues/${id}?_bookings=true&_owner=true`);
  const [singleVenue, setSingleVenue] = useState({});
  // const { formData } = useSearchStore();

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
          <main className="p-4 mb-12 pt-20">{singleVenueIsLoading ? <Loader /> : <SingleVenue venue={singleVenue} />}</main>
        </HelmetProvider>
      )}
    </>
  );
}
