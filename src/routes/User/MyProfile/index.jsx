import { Helmet, HelmetProvider } from "react-helmet-async";
import UserInfo from "../../../components/User/UserInfo";
import { Link } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function MyProfile() {
  const { logOut } = useAuthStore();
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    navigate("/");
  }

  return (
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <meta name="description" content="" />
        <title>My Profile | Holidayz</title>
      </Helmet>
      <main className="pt-16">
        <section className="flex flex-col p-6 gap-2">
          <Link to="/" className="text-primary-blue underline text-lg">
            Book your next stay
          </Link>
          <Link to="/user/mySettings" className="text-primary-blue underline text-lg">
            Register as a venue manager
          </Link>
          <Link to="/user/newListing" className="text-primary-blue underline text-lg">
            Add new listing
          </Link>
          <Link className="text-primary-blue underline text-lg" onClick={() => handleLogOut()}>
            Log out
          </Link>
        </section>
        <section className="flex flex-col p-2 gap-2">
          <UserInfo />
        </section>
      </main>
    </HelmetProvider>
  );
}
