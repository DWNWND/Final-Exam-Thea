import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Login() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Login | Holidayz</title>
      </Helmet>
      <div>
        <h1>Login</h1>
      </div>
    </HelmetProvider>
  );
}
