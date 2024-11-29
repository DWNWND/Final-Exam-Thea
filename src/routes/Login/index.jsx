import { Helmet, HelmetProvider } from "react-helmet-async";
import LoginForm from "../../components/Forms/Login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore.js";
import MainElement from "../../components/MainElement/index.jsx";

export default function Login() {
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
        <title>Login | Holidayz</title>
      </Helmet>
      <MainElement noPadding={true} tailw="flex items-center justify-center">
        <section className="backgroundImage p-4 py-20 flex justify-center items-center min-h-screen w-full">
          <LoginForm />
        </section>
      </MainElement>
    </HelmetProvider>
  );
}
