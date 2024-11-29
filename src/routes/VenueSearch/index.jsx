import { Helmet, HelmetProvider } from "react-helmet-async";
import ListSearchForm from "../../components/SearchForm/ListSearchForm";

export default function VenueSearch() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Search| Holidayz</title>
        {/* add search details */}
      </Helmet>
      <div>
        <h1>Venue Search</h1>
        <section>
          <ListSearchForm />
        </section>
      </div>
    </HelmetProvider>
  );
}
