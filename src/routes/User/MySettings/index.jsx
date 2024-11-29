import { Helmet, HelmetProvider } from "react-helmet-async";
import {  useEffect } from "react";
import useAuthStore from "../../../stores/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import SettingsForm from "../../../components/Forms/UserSettings/index.jsx";

export default function MySettings() {
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
        <title>My Settings | Holidayz</title>
      </Helmet>
      <main className="pt-16 p-4">
        <h1 className="uppercase text-lg text-primary-blue mb-6">Profile settings</h1>
        <SettingsForm />
      </main>
    </HelmetProvider>
  );
}
