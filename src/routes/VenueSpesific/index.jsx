import { Helmet, HelmetProvider } from "react-helmet-async";
import SingleVenue from "../../components/Venues/SingleVenue";
import MainElement from "../../components/MainElement/index.jsx";
import { useBookingDataStore, useTravelDatesStore } from "../../stores";
import { useEffect } from "react";

export default function VenueSpesific() {
  const { selectedVenue } = useBookingDataStore();
  const { setInitialDates } = useTravelDatesStore();

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    setInitialDates({
      todayDateObj: today,
      tomorrowDateObj: tomorrow,
    });
  }, []);

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
