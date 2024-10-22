import { Helmet, HelmetProvider } from "react-helmet-async";

export default function BookingSummary() {
  return (
    <HelmetProvider>
    <Helmet prioritizeSeoTags>
      <meta name="description" content="" />
      <title>Booking Summary | Holidayz</title>
    </Helmet>
    <div>
      <h1>Booking Summary</h1>
    </div>
    </HelmetProvider>
  );
}
