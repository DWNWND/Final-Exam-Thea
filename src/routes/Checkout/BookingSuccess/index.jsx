import { Helmet, HelmetProvider } from "react-helmet-async";

export default function BookingSuccess() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Booking Success | Holidayz</title>
      </Helmet>
      <div>
        <h1>Booking Success</h1>
      </div>
    </HelmetProvider>
  );
}
