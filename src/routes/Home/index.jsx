import { Helmet, HelmetProvider } from "react-helmet-async";
import SearchForm from "../../components/SearchForm";
import style from "./Home.module.css";
import SelectBtns from "../../components/Buttons/SelectBtn";
import { useState } from "react";
import CategorizedVenueCards from "../../components/Venues/CategorizedVenueCards";
import { DataContext } from "../../components/DataProvider";
import { useContext } from "react";
import NewestListings from "../../components/Venues/NewestListings";

export default function Home() {
  const [filters, setFilters] = useState("unique");
  const { venues } = useContext(DataContext);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Home | Holidayz</title>
      </Helmet>
      <div>
        <section id="searchHeader" className={`${style.searchSection} p-4 h-[80svh] flex justify-center items-center`}>
          <SearchForm />
        </section>
        <section id="categorizedListings" className="p-4 flex flex-col gap-4">
          <SelectBtns filters={filters} setFilters={setFilters} />
          <CategorizedVenueCards filters={filters} venues={venues} />
        </section>
        <section id="newestListings" className="p-4 bg-comp-green">
          <NewestListings venues={venues} />
        </section>
      </div>
    </HelmetProvider>
  );
}
