import { Helmet, HelmetProvider } from "react-helmet-async";

export default function EditListing() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Edit Listing | Holidayz</title>
      </Helmet>
      <div>
        <h1>Edit Listing</h1>
      </div>
    </HelmetProvider>
  );
}
