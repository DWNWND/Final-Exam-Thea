import { useContext } from "react";
import { Link } from "react-router-dom";
import { OpenMenuContext } from "../../../../contexts";
import useAuthStore from "../../../../stores/useAuthStore";
import SquareBtn from "../../../Buttons/SquareBtn";
import RoundBtn from "../../../Buttons/RoundBtn";

export default function HamburgerMenu() {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);

  function onHamburgerMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <button className={`w-6 h-6 border-0 p-0 flex justify-center items-center z-[100]`} value="button to open and close menu" onClick={() => onHamburgerMenuClick()}>
        <div className={isMenuOpen ? "burger burger-squeeze open" : "burger burger-squeeze"}>
          <div className="hidden">menu</div>
          <div className="burger-lines"></div>
        </div>
      </button>
      <OpenMenu />
    </>
  );
}

function OpenMenu() {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);
  const { userName, accessToken } = useAuthStore();

  function handleClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav
      className={`${isMenuOpen ? "opacity-100 z-50" : "opacity-0 -translate-y-full z-0"} 0
      shadow-md border-t border-primary-green fixed top-[64px] md:top-[73px] left-0 w-full transition-all duration-500 ease-in-out`}>
      <ul className="py-10 bg-white flex flex-col lg:flex-row justify-between p-8 gap-4">
        <li>
          <Link to="/" className={`text-nowrap text-black font-semibold`} onClick={() => handleClick()}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/" className={`text-nowrap text-black font-semibold`} onClick={() => handleClick()}>
            Search accommodation
          </Link>
        </li>
        <li>
          <Link to="/new/listing" className={`text-nowrap text-black font-semibold`} onClick={() => handleClick()}>
            Add new listing
          </Link>
        </li>
        <div className="w-full h-0.5 bg-comp-green lg:hidden"></div>
        <li>
          <Link to="/about" className="text-nowrap" onClick={() => handleClick()}>
            About Holidaze
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-nowrap" onClick={() => handleClick()}>
            Contact us
          </Link>
        </li>
        <li>
          <Link to="/terms" className="text-nowrap" onClick={() => handleClick()}>
            Terms & conditions
          </Link>
        </li>
        <li>
          <Link to="/faq" className="text-nowrap" onClick={() => handleClick()}>
            FAQ
          </Link>
        </li>
      </ul>
      {accessToken && (
        <div className="bg-comp-gray h-full">
          <div className="bg-primary-green h-px"></div>
          <ul className="flex flex-col gap-4 p-8">
            <li>
              <Link to={`/user/${userName}/new/listing`}>
                <SquareBtn clickFunc={handleClick} innerText="Publish new listing" bgColor="white" textColor="primary-green" borderColor="primary-green" />
              </Link>
            </li>
            <li>
              <Link to={`/user/${userName}/listings`}>
                <SquareBtn clickFunc={handleClick} innerText="My listings" bgColor="white" textColor="primary-green" borderColor="primary-green" />
              </Link>
            </li>
            <li>
              <Link to={`/user/${userName}/bookings`}>
                <SquareBtn clickFunc={handleClick} innerText="my bookings" bgColor="white" textColor="primary-green" borderColor="primary-green" />
              </Link>
            </li>
            {/* <li>
              <Link to={accessToken ? `/user/${userName}` : "/login"}>
                <RoundBtn innerText={accessToken ? "My profile" : "Login"} bgColor="primary-green" textColor="white" />
              </Link>
            </li> */}
          </ul>
        </div>
      )}
    </nav>
  );
}
