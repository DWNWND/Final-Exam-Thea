import { Helmet, HelmetProvider } from "react-helmet-async";
import SingleVenue from "../../components/Venues/SingleVenue";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.jsx";
import { useParams } from "react-router-dom";
import MainElement from "../../components/MainElement/index.jsx";
import Loader from "../../components/Loader/index.jsx";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

//in single venue i fetch the data here, while in the edit profile and edit listing i fetch it one level down in the form component??? - fix this??? Here i also use a differen hook to fetch the data???
export default function VenueSpesific() {
  const { id } = useParams();
  const { data: singleVenueData, isLoading: singleVenueIsLoading, isError: singleVenueIsError } = useFetch(`${apiBaseUrl}/holidaze/venues/${id}?_bookings=true&_owner=true`);
  const [singleVenue, setSingleVenue] = useState({});

  useEffect(() => {
    if (singleVenueData && singleVenueData.data) {
      setSingleVenue(singleVenueData.data);
    }
  }, [singleVenueData]);

  const isNotEmpty = (obj) => Object.keys(obj).length > 0;
  const onlyRenderWhenSet = isNotEmpty(singleVenue);

  return (
    <>
      {singleVenueIsLoading ? (
        <Loader />
      ) : (
        <>
          {onlyRenderWhenSet && (
            <HelmetProvider>
              <Helmet prioritizeSeoTags>
                <meta name="description" content="" />
                <title> {singleVenue.name} | Holidayz</title>
                {/* add decription too */}
              </Helmet>
              <MainElement>
                <SingleVenue venue={singleVenue} />
              </MainElement>
            </HelmetProvider>
          )}
        </>
      )}
    </>
  );
}
