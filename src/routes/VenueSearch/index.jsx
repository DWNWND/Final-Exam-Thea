import { Helmet, HelmetProvider } from "react-helmet-async";
import ListSearchForm from "../../components/SearchForm/ListSearchForm";
import { DataContext } from "../../components/DataProvider";
import { useContext } from "react";
import ListSearch from "../../components/Venues/ListSearch";
import { useSearchStore } from "../../stores/useSearchStore.js";

export default function VenueSearch() {
  const { venues, isLoading } = useContext(DataContext);
  const { formData } = useSearchStore();

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Search| Holidayz</title>
        {/* add search details */}
      </Helmet>
      <main className="flex flex-col xl:flex-row p-4 xl:gap-8">
        <section className="max-w-md flex justify-center">
          <ListSearchForm />
        </section>
        <section className="py-12 w-full">
          <h1 className="font-bold text-xl text-black">Results for {formData.location}</h1>
          <ListSearch venues={venues} searchQuery={formData} isLoading={isLoading}/>
        </section>
      </main>
    </HelmetProvider>
  );
}
