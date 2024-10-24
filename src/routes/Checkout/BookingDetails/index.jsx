import { Helmet, HelmetProvider } from "react-helmet-async";

export default function BookingDetails() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Booking Details | Holidayz</title>
      </Helmet>
      <div>
        <h1>Booking details</h1>
      </div>
    </HelmetProvider>
  );
}
