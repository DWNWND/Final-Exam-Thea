import { Helmet, HelmetProvider } from "react-helmet-async";
import MainSearchForm from "../../components/Forms/SearchTravel/MainSearchForm";
import SelectCategoryBtns from "../../components/ButtonGroupes/SelectCategoryBtns";
import { useEffect, useState } from "react";
import ListCategorized from "../../components/Venues/ListCategorized";
import ListNewest from "../../components/Venues/ListNewest";
import { DataProvider } from "../../components/DataProvider";
import MainElement from "../../components/MainElement";
import { useBookingDataStore, useSearchStore } from "../../stores";

export default function Home() {
  const [filters, setFilters] = useState("unique");
  const { clearTravelSearchStore } = useSearchStore();
  const { clearBookingDataStore } = useBookingDataStore();

  useEffect(() => {
    clearTravelSearchStore();
    clearBookingDataStore();
  }, []);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Home | Holidayz</title>
      </Helmet>
      <MainElement noPadding={true}>
        <DataProvider>
          <section id="searchHeader" className="backgroundImage p-4 py-20 flex justify-center items-center min-h-screen w-full">
            <MainSearchForm />
          </section>
          <section id="categorizedListings" className="p-4 pb-12 md:my-10">
            <SelectCategoryBtns filters={filters} setFilters={setFilters} />
            <ListCategorized filters={filters} />
          </section>
          <section id="newestListings" className="p-4 py-12 bg-comp-green">
            <ListNewest />
          </section>
        </DataProvider>
      </MainElement>
    </HelmetProvider>
  );
}
