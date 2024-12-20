import { Helmet, HelmetProvider } from "react-helmet-async";
import ListSearchForm from "../../components/Forms/TravelSearch/ListSearchForm";
import { useTravelSearchStore } from "../../stores";
import { DataProvider } from "../../components/DataProvider";
import MainElement from "../../components/MainElement";
import ListSearch from "../../components/Lists/ListSearch";

export default function ListingSearch(): JSX.Element {
  const { travelSearchData } = useTravelSearchStore();

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>{`Stays in ${travelSearchData.location} | Holidaze`}</title>
        <meta name="description" content="Find your next accommodation with ease. Search from a wide range of hotels to suit every budget and preferences. Start your journey to your dream vacation today!" />
      </Helmet>
      <MainElement tail="flex flex-col lg:flex-row gap-8">
        <DataProvider>
          <section className="lg:max-w-md flex justify-center">
            <ListSearchForm />
          </section>
          <ListSearch />
        </DataProvider>
      </MainElement>
    </HelmetProvider>
  );
}
