import { Helmet, HelmetProvider } from "react-helmet-async";
import UserProfile from "../../../components/User/UserProfile";
import ProfileLinks from "../../../components/User/ProfileLinks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore.js";
import useFetchUser from "../../../hooks/useApiCall.jsx";

const url = import.meta.env.VITE_API_BASE_URL;

export default function MyProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { userName, accessToken } = useAuthStore();
  const { callApiWith } = useFetchUser(accessToken);

  if (!accessToken) {
    navigate("/");
    // return null;
  }

  const fetchData = async () => {
    const response = await callApiWith(`${url}/holidaze/profiles/${userName}?_venues=true&_bookings=true`, {
      method: "GET",
    });
    setUser(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      {user && (
        <main className="pt-16">
          <section className="flex flex-col p-6 gap-2">
            <ProfileLinks venueManager={user.venueManager} />
          </section>
          <section className="flex flex-col p-2 gap-2">
            <UserProfile user={user} />
          </section>
        </main>
      )}
    </HelmetProvider>
  );
}
