import { Helmet, HelmetProvider } from "react-helmet-async";
import RegisterForm from "../../components/Forms/Register";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore.js";
import MainElement from "../../components/MainElement/index.jsx";

export default function Register() {
  const { accessToken, userName } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/user/" + userName);
    }
  }, [accessToken]);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Register New User| Holidayz</title>
      </Helmet>
      <MainElement>
        <RegisterForm />
      </MainElement>
    </HelmetProvider>
  );
}
