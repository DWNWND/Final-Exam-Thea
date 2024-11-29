import useCheckScreenSize from "../../../hooks/useCheckScreenSize";
import { Link } from "react-router-dom";
import { NavBtn } from "../../Buttons";
import { useContext } from "react";
import { OpenMenuContext } from "../../../contexts";

export default function FixedBtnDisplay() {
  const { isMenuOpen } = useContext(OpenMenuContext);

  const isMobile = useCheckScreenSize();
  // temporarily:
  const isLoggedIn = false;

  // if (!isMobile) return null;

  return (
    <div className={`${isMobile && "fixed bottom-0 w-full shadow-2xl p-4 bg-whiteTransparent"}  ${isMenuOpen && "hidden"}z-50`}>
      <ul className="flex flex-row gap-4">
        <li className="w-full">
          <Link to={isLoggedIn ? "/:username/newListing" : "/login"}>
            <NavBtn innerText="List your place" tailw="rounded bg-white" color="primary-green" />
          </Link>
        </li>
        <li className="w-full">
          <NavBtn innerText="Nok" tailw="rounded bg-white" color="primary-green" />
        </li>
        <li className="w-full">
          <Link to="/login">
            <NavBtn innerText="Login" tailw="rounded-full bg-white" color="primary-green" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
