import { Link } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function ProfileLinks() {
  const { logOut, userName, venueManager } = useAuthStore();
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    navigate("/");
  }

  console.log(venueManager);
  return (
    <>
      <Link to="/" className="text-primary-blue underline text-lg">
        Book your next stay
      </Link>
      <>
        {venueManager ? (
          <Link to={`/user/${userName}/newListing`} className="text-primary-blue underline text-lg">
            Publish new listing
          </Link>
        ) : (
          <Link to={`/user/${userName}/settings`} className="text-primary-blue underline text-lg">
            Register as a venue manager
          </Link>
        )}
      </>
      <Link className="text-primary-blue underline text-lg" onClick={() => handleLogOut()}>
        Log out
      </Link>
    </>
  );
}
