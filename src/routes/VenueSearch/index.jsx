import { Helmet, HelmetProvider } from "react-helmet-async";
import ListSearchForm from "../../components/Forms/SearchTravel/ListSearchForm/index.jsx";
import ListSearch from "../../components/Venues/ListSearch";
import { useSearchStore } from "../../stores/useSearchStore.js";
import { DataProvider } from "../../components/DataProvider";
import MainElement from "../../components/MainElement/index.jsx";

export default function VenueSearch() {
  const { travelSearchData } = useSearchStore();

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Stays in {travelSearchData.location} | Holidayz</title>
        {/* add description as well */}
        {/* add search details */}
      </Helmet>
      <MainElement tailw="flex flex-col lg:flex-row gap-8">
        <DataProvider>
          <section className="lg:max-w-md flex justify-center">
            <ListSearchForm />
          </section>
          <section className=" w-full">
            <h1 className="font-bold text-2xl text-black">Results for {travelSearchData.location}</h1>
            <ListSearch />
          </section>
        </DataProvider>
      </MainElement>
    </HelmetProvider>
  );
}
