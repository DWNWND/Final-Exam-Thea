import { Helmet, HelmetProvider } from "react-helmet-async";
import UserProfile from "../../../components/User/UserProfile";
import ProfileLinks from "../../../components/User/ProfileLinks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore.js";

export default function MyProfile() {
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
        <title>My Profile | Holidayz</title>
      </Helmet>
      <main className="pt-16">
        <section className="flex flex-col p-6 gap-2">
          <ProfileLinks />
        </section>
        <section className="flex flex-col p-2 gap-2">
          <UserProfile />
        </section>
      </main>
    </HelmetProvider>
  );
}
