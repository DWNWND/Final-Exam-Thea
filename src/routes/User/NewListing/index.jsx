import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useAuthStore} from "../../../stores";
import NewListingForm from "../../../components/Forms/NewListing";
import MainElement from "../../../components/MainElement/index.jsx";

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
      <MainElement tailw="bg-comp">
        <h1 className="hidden uppercase text-2xl text-primary-green text-center mb-6">New Listing</h1>
        <NewListingForm />
      </MainElement>
    </HelmetProvider>
  );
}
