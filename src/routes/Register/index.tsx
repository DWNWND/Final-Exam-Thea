import { Helmet, HelmetProvider } from "react-helmet-async";
import RegisterForm from "../../components/Forms/RegisterForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores";
import MainElement from "../../components/MainElement";

export default function Register(): JSX.Element {
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
        <title>Register New User | Holidaze</title>
        <meta name="description" content="Join Holidaze and start your journey today. Create an account to explore accommodations, manage bookings, and list your own properties effortlessly" />
      </Helmet>
      <MainElement noPadding={true} tail="flex items-center justify-center">
        <section className="backgroundImage p-4 py-20 flex justify-center items-center min-h-screen w-full">
          <RegisterForm />
        </section>
      </MainElement>
    </HelmetProvider>
  );
}
