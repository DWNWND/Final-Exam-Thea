import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore.js";
import MainElement from "../../../components/MainElement/index.jsx";
import EditListingForm from "../../../components/Forms/EditListing/index.jsx";

export default function EditListing() {
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
        <title>Edit Listing | Holidayz</title>
      </Helmet>
      <MainElement>
        <EditListingForm />
      </MainElement>
    </HelmetProvider>
  );
}
