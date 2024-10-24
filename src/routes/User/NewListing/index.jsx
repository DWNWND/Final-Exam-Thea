import { Helmet, HelmetProvider } from "react-helmet-async";

export default function NewListing() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>New Listing | Holidayz</title>
      </Helmet>
      <div>
        <h1>New Listing</h1>
      </div>
    </HelmetProvider>
  );
}
