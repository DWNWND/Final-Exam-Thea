import { Helmet, HelmetProvider } from "react-helmet-async";
import ListSearchForm from "../../components/Forms/SearchTravel/ListSearchForm/index.jsx";
import ListSearch from "../../components/Venues/ListSearch";
import { useTravelSearchStore } from "../../stores";
import { DataProvider } from "../../components/DataProvider";
import MainElement from "../../components/MainElement/index.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VenueSearch() {
  const { travelSearchData } = useTravelSearchStore();
  const navigate = useNavigate();


  useEffect(() => {
    if (!travelSearchData.location) {
      navigate("/");
    }
  }, [travelSearchData.location]);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>{`Stays in ${travelSearchData.location} | Holidaze`}</title>
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
