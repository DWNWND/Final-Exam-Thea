import { Helmet, HelmetProvider } from "react-helmet-async";
import MainSearchForm from "../../components/SearchForm/MainSearchForm";
import style from "./Home.module.css";
import SelectBtns from "../../components/Buttons/SelectBtn";
import { useState } from "react";
import ListCategorized from "../../components/Venues/ListCategorized";
import { DataContext } from "../../components/DataProvider";
import { useContext } from "react";
import ListNewest from "../../components/Venues/ListNewest";

export default function Home() {
  const [filters, setFilters] = useState("unique");
  const { venues } = useContext(DataContext);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Home | Holidayz</title>
      </Helmet>
      <main>
        <section id="searchHeader" className={`${style.searchSection} p-4 py-20 flex justify-center items-center`}>
          <MainSearchForm />
        </section>
        <section id="categorizedListings" className="p-4 pb-12">
          <SelectBtns filters={filters} setFilters={setFilters} />
          <ListCategorized filters={filters} venues={venues} />
        </section>
        <section id="newestListings" className="p-4 py-12 bg-comp-green">
          <ListNewest venues={venues} />
        </section>
      </main>
    </HelmetProvider>
  );
}
