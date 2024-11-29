import { Helmet, HelmetProvider } from "react-helmet-async";
import RegisterForm from "../../components/Forms/Register";

export default function Register() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Register New User| Holidayz</title>
      </Helmet>
      <div>
        <RegisterForm />
      </div>
    </HelmetProvider>
  );
}
