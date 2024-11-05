import { Helmet, HelmetProvider } from "react-helmet-async";
import UserProfile from "../../../components/User/UserProfile";
import ProfileLinks from "../../../components/User/ProfileLinks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore.js";
import useFetchUser from "../../../hooks/useApiCall.jsx";
import ListBookings from "../../../components/User/ListBookings";
import ListVenues from "../../../components/User/ListVenues";
import { Link } from "react-router-dom";

function SelectionBtns({ selector, setSelector }) {
  return (
    <div className="flex flex-col gap-2 pt-4 pb-8 lg:flex-row md:justify-center lg:justify-start">
      <button onClick={() => setSelector("bookings")} className={`${selector === "bookings" ? "bg-primary-green text-white" : "border border-solid border-color-primary-green text-primary-green"} md:w-auto text-nowrap rounded-full w-full p-2 px-20 flex justify-center uppercase hover:shadow-md`}>
        My bookings
      </button>
      <button onClick={() => setSelector("listings")} className={`${selector === "listings" ? "bg-primary-green text-white" : "border border-solid border-color-primary-green text-primary-green"} md:w-auto text-nowrap rounded-full w-full p-2 px-20 flex justify-center uppercase hover:shadow-md`}>
        My listings
      </button>
    </div>
  );
}

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
        <main className="flex flex-col lg:flex-row p-4 xl:gap-8 pt-20">
          <section className="flex flex-col p-6 gap-2 lg:max-w-md">
            <div className="xl:sticky xl:top-20">
              <ProfileLinks venueManager={user.venueManager} />
              <UserProfile user={user} />
            </div>
          </section>
          <section className="flex flex-col p-6 gap-2 py-12 w-full">
            {user.bookings.length > 1 && user.venues.length > 1 && <SelectionBtns selector={selector} setSelector={setSelector} />}
            {user.bookings.length > 1 ? (
              <ListBookings bookings={user.bookings} />
            ) : (
              <div className="flex flex-col justify-center items-center my-6 gap-4">
                <p className="italic text-center">You currently have no bookings</p>
                <Link to="/" className="text-primary-blue underline text-lg">
                  Start planning your next adventure now!
                </Link>
              </div>
            )}
            {user.venues.length > 1 && <ListVenues venues={user.venues} />}
          </section>
        </main>
      )}
    </HelmetProvider>
  );
}
