import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import MainElement from "../../../components/MainElement/";
import EditListingForm from "../../../components/Forms/EditListingForm/";

export default function EditListing() {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  const [listingName, setListingName] = useState("");

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>{`Edit Listing | ${listingName && listingName} | Holidaze`}</title>
        <meta name="description" content="Update and refine your Holidaze property listing details. Ensure your accommodation stands out to potential guests." />
      </Helmet>
      <MainElement>
        <EditListingForm setListingName={setListingName} />
      </MainElement>
    </HelmetProvider>
  );
}
