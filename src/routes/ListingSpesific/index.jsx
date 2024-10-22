import { Helmet, HelmetProvider } from "react-helmet-async";

export default function ListingSpesific() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Listing | Holidayz</title> 
        {/* add listing name */}
      </Helmet>
      <div>
        <h1>Listing Spesific</h1>
      </div>
    </HelmetProvider>
  );
}
