import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import MainElement from "../../../components/MainElement/index.jsx";
import ProfileOverview from "../../../components/User/ProfileOverview/index.jsx";

export default function MyProfile() {
  const { userName, accessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>{`My Profile | ${userName} | Holidaze`}</title>
        <meta name="description" content="View your Holidaze account details, manage your listings, track bookings, and stay updated with your activity." />
      </Helmet>
      <MainElement tailw="flex flex-col gap-8 lg:flex-row min-h-screen">
        <ProfileOverview />
      </MainElement>
    </HelmetProvider>
  );
}
