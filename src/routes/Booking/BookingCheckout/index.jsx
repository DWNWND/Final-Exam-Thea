import { Helmet, HelmetProvider } from "react-helmet-async";
import CheckoutForm from "../../../components/Forms/Booking/CheckoutForm";
import MainElement from "../../../components/MainElement";

export default function BookingCheckout() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Booking details | Holidayz</title>
      </Helmet>
      <MainElement>
        <CheckoutForm />
      </MainElement>
    </HelmetProvider>
  );
}
