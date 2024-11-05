import { Helmet, HelmetProvider } from "react-helmet-async";
import ListSearchForm from "../../components/Forms/SearchTravel/ListSearchForm/index.jsx";
import { DataContext } from "../../components/DataProvider";
import { useContext } from "react";
import ListSearch from "../../components/Venues/ListSearch";
import { useSearchStore } from "../../stores/useSearchStore.js";
import { DataProvider } from "../../components/DataProvider";

export default function VenueSearch() {
  const { travelSearchData } = useSearchStore();

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Search| Holidayz</title>
        {/* add search details */}
      </Helmet>
      <main className="flex flex-col lg:flex-row p-4 xl:gap-8 pt-20">
        <DataProvider>
          <section className="lg:max-w-md flex justify-center">
            <ListSearchForm />
          </section>
          <section className="py-12 w-full">
            <h1 className="font-bold text-xl text-black">Results for {travelSearchData.location}</h1>
            <ListSearch />
          </section>
        </DataProvider>
      </main>
    </HelmetProvider>
  );
}
