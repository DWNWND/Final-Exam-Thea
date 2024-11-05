import { Helmet, HelmetProvider } from "react-helmet-async";
import LoginForm from "../../../components/Forms/Login";
import useAuthStore from "../../../stores/useAuthStore.js";

export default function BookingSummary() {
  const { accessToken, userName } = useAuthStore();

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Login | Holidayz</title>
      </Helmet>
      <main className="pt-20">
        <h1 className="uppercase text-3xl font-bold text-center text-primary-blue">Booking Summary</h1>
        <div>
          
        </div>
      </main>
    </HelmetProvider>
  );
}
