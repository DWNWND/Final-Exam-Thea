import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Register() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>Register New User| Holidayz</title>
      </Helmet>
      <div>
        <h1>Register</h1>
      </div>
    </HelmetProvider>
  );
}
