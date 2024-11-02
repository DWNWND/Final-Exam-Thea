import { Helmet, HelmetProvider } from "react-helmet-async";
import UserInfo from "../../../components/User/UserInfo";

export default function MyProfile() {
  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>My Profile | Holidayz</title>
      </Helmet>
      <main className="pt-16">
        <UserInfo />
      </main>
    </HelmetProvider>
  );
}
