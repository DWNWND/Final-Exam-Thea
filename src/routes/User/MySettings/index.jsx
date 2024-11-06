import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import useAuthStore from "../../../stores/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import SettingsForm from "../../../components/Forms/UserSettings/index.jsx";
import MainElement from "../../../components/MainElement/index.jsx";

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
      <MainElement tailw="flex flex-col items-center">
        <h1 className="uppercase text-lg text-primary-blue mb-6 md:text-2xl">Profile settings</h1>
        <SettingsForm />
      </MainElement>
    </HelmetProvider>
  );
}
