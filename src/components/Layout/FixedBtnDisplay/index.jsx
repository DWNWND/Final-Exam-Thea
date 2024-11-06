import useCheckScreenSize from "../../../hooks/useCheckScreenSize";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { OpenMenuContext } from "../../../contexts";
import useAuthStore from "../../../stores/useAuthStore";
import SquareBtn from "../../Buttons/SquareBtn";
import RoundBtn from "../../Buttons/RoundBtn";

export default function FixedBtnDisplay() {
  const { isMenuOpen } = useContext(OpenMenuContext);
  const { userName, accessToken } = useAuthStore();

  const isMobile = useCheckScreenSize();
  // if (!isMobile) return null;

  return (
    <div className={`${isMobile && "fixed bottom-0 w-full shadow-2xl p-4 bg-white bg-opacity-70"}  ${isMenuOpen && "hidden"} z-50`}>
      <ul className="flex flex-row gap-4">
        <li className="w-full">
          <Link to={accessToken ? `/user/${userName}/new/listing` : "/login"}>
            <SquareBtn innerText="List your place" tailw="hover:bg-white bg-opacity-50" bordered={true} bgColor="white" textColor="primary-green" borderColor="primary-green" />
          </Link>
        </li>
        <li className="w-full">
          <SquareBtn innerText="Nok" tailw="hover:bg-white bg-opacity-50" bordered={true} bgColor="white" textColor="primary-green" borderColor="primary-green" />
        </li>
        <li className="w-full">
          <Link to={accessToken ? `/user/${userName}` : "/login"}>
            <RoundBtn innerText={accessToken ? "My profile" : "Login"} bordered={accessToken ? false : true} bgColor="primary-green" textColor="white" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
