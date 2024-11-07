import { Helmet, HelmetProvider } from "react-helmet-async";
import MainSearchForm from "../../components/Forms/SearchTravel/MainSearchForm";
import style from "./Home.module.css";
import SelectCategoryBtns from "../../components/ButtonGroupes/SelectCategoryBtns";
import { useState } from "react";
import ListCategorized from "../../components/Venues/ListCategorized";
import ListNewest from "../../components/Venues/ListNewest";
import { DataProvider } from "../../components/DataProvider";
import MainElement from "../../components/MainElement";

export default function Home() {
  const [filters, setFilters] = useState("unique");

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Home | Holidayz</title>
      </Helmet>
      <MainElement homePage={true}>
        <DataProvider>
          <section id="searchHeader" className={`${style.searchSection} p-4 py-20 flex justify-center items-center min-h-screen`}>
            <MainSearchForm />
          </section>
          <section id="categorizedListings" className="p-4 pb-12">
            <SelectCategoryBtns filters={filters} setFilters={setFilters} />
            <ListCategorized filters={filters} />
          </section>
          <section id="newestListings" className="p-4 py-12 bg-comp-green">
            <ListNewest />
          </section>
        </DataProvider>
      </MainElement >
    </HelmetProvider>
  );
}
