import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import MainElement from "../../../components/MainElement/index.jsx";
import EditListingForm from "../../../components/Forms/EditListing/index.jsx";

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
        <meta name="description" content="" />
        <title>{`Edit Listing | ${listingName && listingName} | Holidaze`}</title>
      </Helmet>
      <MainElement>
        <EditListingForm setListingName={setListingName}/>
      </MainElement>
    </HelmetProvider>
  );
}
