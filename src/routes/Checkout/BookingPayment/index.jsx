import { Helmet, HelmetProvider } from "react-helmet-async";

export default function BookingPayment() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Booking Payment | Holidayz</title>
      </Helmet>
      <div>
        <h1>Booking Payment</h1>
      </div>
    </HelmetProvider>
  );
}
