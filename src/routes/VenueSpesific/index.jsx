import { Helmet, HelmetProvider } from "react-helmet-async";
import SingleVenue from "../../components/Venues/SingleVenue";
import MainElement from "../../components/MainElement/index.jsx";
import { useBookingDataStore } from "../../stores";

export default function VenueSpesific() {
  const { selectedVenue } = useBookingDataStore();

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title> {`${selectedVenue && selectedVenue.name} | Holidaze`}</title>
        {/* add decription too */}
      </Helmet>
      <MainElement>
        <SingleVenue />
      </MainElement>
    </HelmetProvider>
  );
}
