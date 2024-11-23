import { Helmet, HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { useAuthStore } from "../../../stores";
import { useNavigate } from "react-router-dom";
import SettingsForm from "../../../components/Forms/UserSettings/index.jsx";
import MainElement from "../../../components/MainElement/index.jsx";

export default function MySettings() {
  const { accessToken, userName } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/");
    }
  }, [accessToken]);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>{`My Settings | ${userName} | Holidaze`}</title>
        <meta name="description" content="Update your Holidaze profile information, adjust preferences, register as a venue manager and customize your avatar and banner to reflect your style." />
      </Helmet>
      <MainElement tailw="flex flex-col items-center">
        <SettingsForm />
      </MainElement>
    </HelmetProvider>
  );
}
