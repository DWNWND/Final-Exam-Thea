import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import NewListingForm from "../../../components/Forms/NewListingForm";
import MainElement from "../../../components/MainElement";
import { RoundBtn } from "../../../components/Buttons";

export default function NewListing(): JSX.Element {
  const { accessToken, userName, venueManager } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken]);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>{`New Listing | ${userName} | Holidaze`}</title>
        <meta name="description" content="Create and publish your property listing with ease. Start sharing your unique space today and connect with travelers worldwide!" />
      </Helmet>
      <MainElement tailw="bg-comp">
        {venueManager ? (
          <section>
            <h1 className="hidden uppercase text-2xl text-primary-green text-center mb-6">New Listing</h1>
            <NewListingForm />
          </section>
        ) : (
          <section>
            <h1 className="uppercase text-2xl text-primary-green text-center mb-6 mt-10">You have to register as a venue manager to publish listings</h1>
            <RoundBtn innerText="Register as Venue Manager" bgColor="primary-green" tailw="m-auto" textColor="white" clickFunc={() => navigate(`/user/${userName}/settings`)} />
          </section>
        )}
      </MainElement>
    </HelmetProvider>
  );
}
