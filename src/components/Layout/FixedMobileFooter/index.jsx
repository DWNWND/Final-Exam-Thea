import useCheckScreenSize from "../../../hooks/useCheckScreenSize";
import { Link } from "react-router-dom";
import { NavBtn } from "../../Buttons";

export default function FixedMobileFooter() {
  const isMobile = useCheckScreenSize();

  // temporarily:
  const isLoggedIn = false;

  if (!isMobile) return null;
  return (
    <footer className="fixed bottom-0 w-full bg-white p-4 shadow-2xl">
      <ul className="flex flex-row gap-2 ">
        <li className="w-full">
          <Link to={isLoggedIn ? "/:username/newListing" : "/login"}>
            <NavBtn innerText="List your place" tailw="rounded" color="primary-green" />
          </Link>
        </li>
        <li className="w-full">
          <NavBtn innerText="Nok" tailw="rounded" color="primary-green" />
        </li>
        <li className="w-full">
          <Link to="/login">
            <NavBtn innerText="Login" tailw="rounded-full shadow-md" color="primary-green" />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
