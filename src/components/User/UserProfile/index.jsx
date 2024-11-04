import { useState } from "react";
import ListBookings from "../ListBookings";
import React, { useEffect } from "react";
import useFetchUser from "../../../hooks/useFetchUser";
import useAuthStore from "../../../stores/useAuthStore";
import ListVenues from "../ListVenues";
import { Link } from "react-router-dom";

const url = import.meta.env.VITE_API_BASE_URL;

export default function UserProfile() {
  const [selector, setSelector] = useState("bookings");
  const [user, setUser] = useState(null);
  const { userName, accessToken } = useAuthStore();
  const { callApiWith } = useFetchUser(accessToken);

  if (!accessToken) {
    return null;
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

  console.log("user", user);

  return (
    <>
      {user && (
        <>
          <div className="bg-comp-purple rounded-lg p-4">
            {user.venueManager && <VenueManagerBadge />}
            <UserDetails user={user} />
            <SettingsBtn userName={userName} />
          </div>
          {/* <div className="p-4 italic">User registered: {user && user.createdAt}</div> */}
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
        </>
      )}
    </>
  );
}

function VenueManagerBadge() {
  return (
    <div className="flex items-center justify-center">
      <span className="text-md bg-white text-primary-blue font-semibold w-full text-center px-3 py-2 rounded-full">Registered Venue Manager</span>
    </div>
  );
}

function SettingsBtn({ userName }) {
  return (
    <Link to={`/user/${userName}/settings`} className="block text-center w-full border-primary-blue border text-primary-blue text-lg px-3 py-2 rounded-lg">
      my settings
    </Link>
  );
}

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
function UserDetails({ user }) {
  return (
    <>
      {user && (
        <div className="flex my-4 gap-4 items-center p-4">
          <div>
            <img src={user.avatar.url} className="max-w-20 max-h-20 rounded-full"></img>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold">{user.name}</p>
            <p className="">{user.bio}</p>
            <p className="">Registered contact info: {user.email}</p>
          </div>
        </div>
      )}
    </>
  );
}
