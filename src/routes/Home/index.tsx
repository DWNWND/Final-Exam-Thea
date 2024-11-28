import { Helmet, HelmetProvider } from "react-helmet-async";
import MainSearchForm from "../../components/Forms/TravelSearch/MainSearchForm";
import { useEffect } from "react";
import ListCategorized from "../../components/Lists/ListCategorized";
import ListNewest from "../../components/Lists/ListNewest";
import { DataProvider } from "../../components/DataProvider";
import MainElement from "../../components/MainElement";
import { useBookingDataStore, useTravelSearchStore, useTravelDatesStore, useNavigationStore } from "../../stores";

export default function Home(): JSX.Element {
  const { clearTravelSearchStore } = useTravelSearchStore();
  const { clearBookingDataStore } = useBookingDataStore();
  const { clearTravelDatesStore, setInitialDates } = useTravelDatesStore();
  const { clearNavigationHistory } = useNavigationStore();

  //think about adding this on more routes
  useEffect(() => {
    clearTravelSearchStore();
    clearBookingDataStore();
    clearTravelDatesStore();
    clearNavigationHistory();

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
        <title>Home | Holidaze</title>
        <meta name="description" content="Discover your next stay with ease at Holidaze! Search and book accommodations tailored to your needs. Explore top listings and start planning your perfect getaway today." />
      </Helmet>
      <MainElement noPadding={true}>
        <DataProvider>
          <section id="searchHeader" className="backgroundImage p-4 py-20 flex justify-center items-center min-h-screen w-full">
            <MainSearchForm />
          </section>
          <ListCategorized />
          <ListNewest />
        </DataProvider>
      </MainElement>
    </HelmetProvider>
  );
}
