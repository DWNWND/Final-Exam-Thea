import { useState } from "react";
import ListBookings from "../ListBookings";
import useAuthStore from "../../../stores/useAuthStore";
import ListVenues from "../ListVenues";
import { Link } from "react-router-dom";
import ProfileLinks from "../ProfileLinks";

export default function UserProfile({ user }) {
  const { userName, accessToken } = useAuthStore();

  if (!accessToken) {
    return null;
  }

  return (
    <>
      <div className="bg-comp-purple p-6 rounded-3xl md:py-10 shadow-md w-full h-fit xl:sticky xl:top-20">
        {user.venueManager && <VenueManagerBadge />}
        <UserDetails user={user} />
        <SettingsBtn userName={userName} />
      </div>
      {/* <div className="p-4 italic">User registered: {user && user.createdAt}</div> */}

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
