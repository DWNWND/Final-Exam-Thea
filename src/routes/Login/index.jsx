import { Helmet, HelmetProvider } from "react-helmet-async";
import LoginForm from "../../components/Forms/Login";

export default function Login() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Login | Holidayz</title>
      </Helmet>
      <div>
        <LoginForm />
      </div>
    </HelmetProvider>
  );
}
