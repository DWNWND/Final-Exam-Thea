import { Helmet, HelmetProvider } from "react-helmet-async";

export default function ListingSearch() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Search| Holidayz</title>
        {/* add search details */}
      </Helmet>
      <div>
        <h1>Listing Search</h1>
      </div>
    </HelmetProvider>
  );
}
