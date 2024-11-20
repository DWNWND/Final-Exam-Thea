import { Link } from "react-router-dom";
import {useAuthStore} from "../../../stores";
import { useNavigate } from "react-router-dom";

export default function ProfileLinks({ venueManager }) {
  const { logOut, userName } = useAuthStore();
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    navigate("/");
  }

  return (
    <div className="flex flex-col mb-6 p-2 gap-2 ">
      <Link to="/" className="text-primary-blue underline text-lg">
        Book your next stay
      </Link>
      <>
        {venueManager ? (
          <Link to={`/user/${userName}/new/listing`} className="text-primary-blue underline text-lg">
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
    </div>
  );
}
