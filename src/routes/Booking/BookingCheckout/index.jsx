import { Helmet, HelmetProvider } from "react-helmet-async";
import CheckoutForm from "../../../components/Forms/Booking/CheckoutForm";

export default function BookingCheckout() {

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Booking details | Holidayz</title>
      </Helmet>
      <main className="pt-20 p-4">
        <CheckoutForm />
      </main>
    </HelmetProvider>
  );
}


