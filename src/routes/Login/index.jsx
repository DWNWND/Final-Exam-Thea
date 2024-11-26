import { Helmet, HelmetProvider } from "react-helmet-async";
import LoginForm from "../../components/Forms/LoginForm/";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores";
import MainElement from "../../components/MainElement/";

export default function Login() {
  const { accessToken, userName } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate("/user/" + userName);
    }
  }, []);

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>Login | Holidaze</title>
        <meta name="description" content="Log in to access your Holidaze account, manage your bookings, and update your listings. Experience seamless control over your accommodations with our user-friendly platform." />
      </Helmet>
      <MainElement noPadding={true} tailw="flex items-center justify-center">
        <section className="backgroundImage p-4 py-20 flex justify-center items-center min-h-screen w-full">
          <LoginForm />
        </section>
      </MainElement>
    </HelmetProvider>
  );
}
