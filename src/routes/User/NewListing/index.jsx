import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore.js";
import NewListingForm from "../../../components/Forms/NewListing";

export default function NewListing() {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>New Listing | Holidayz</title>
      </Helmet>
      <main className="p-4 pt-20">
        <h1 className="hidden uppercase text-2xl text-primary-green text-center mb-6">New Listing</h1>
        <NewListingForm />
      </main>
    </HelmetProvider>
  );
}
