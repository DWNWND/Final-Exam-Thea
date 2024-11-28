import { useContext } from "react";
import { Link } from "react-router-dom";
import { OpenMenuContext } from "../../../../contexts/";
import { useAuthStore } from "../../../../stores";
import { SquareBtn } from "../../../Buttons";

export default function OpenMenu(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);
  const { userName, accessToken } = useAuthStore();

  const handleClick = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`transition-max-height md:transition-height z-50 duration-500 ease-in-out h-svh md:h-auto overflow-hidden ${isMenuOpen ? "md:h-auto max-h-svh" : "max-h-0 md:h-auto"}`}>
      <ul className="py-10 md:py-20 bg-white flex flex-col lg:flex-row justify-between px-8 md:px-20 gap-4">
        <li>
          <Link to="/" className="text-nowrap text-black font-semibold md:text-lg hover:text-primary-green" onClick={handleClick}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/" className="text-nowrap text-black font-semibold md:text-lg hover:text-primary-green" onClick={handleClick}>
            Search accommodation
          </Link>
        </li>
        <div className="w-full h-0.5 bg-comp-green lg:hidden"></div>
        <li>
          <Link to="/about" className="text-nowrap md:text-lg hover:text-primary-green" onClick={handleClick}>
            About Holidaze
          </Link>
        </li>
        <li>
          <Link to="/contact" className="text-nowrap md:text-lg hover:text-primary-green" onClick={handleClick}>
            Contact us
          </Link>
        </li>
        <li>
          <Link to="/terms" className="text-nowrap md:text-lg hover:text-primary-green" onClick={handleClick}>
            Terms & conditions
          </Link>
        </li>
        <li>
          <Link to="/faq" className="text-nowrap md:text-lg hover:text-primary-green" onClick={handleClick}>
            FAQ
          </Link>
        </li>
      </ul>
      {accessToken && (
        <div className="bg-comp-green h-full md:py-10 border-primary-green border">
          <ul className="flex flex-col md:flex-row gap-4 md:gap-8 px-8 md:px-20 items-stretch w-full">
            <li className="w-full">
              <Link to={`/user/${userName}/new/listing`}>
                <SquareBtn clickFunc={handleClick} width="full" innerText="Publish new listing" bgColor="white" textColor="primary-green" borderColor="primary-green" />
              </Link>
            </li>
            <li className="w-full">
              <Link to={`/user/${userName}/mylistings`}>
                <SquareBtn clickFunc={handleClick} width="full" innerText="My listings" bgColor="white" textColor="primary-green" borderColor="primary-green" />
              </Link>
            </li>
            <li className="w-full">
              <Link to={`/user/${userName}/mybookings`}>
                <SquareBtn clickFunc={handleClick} width="full" innerText="My bookings" bgColor="white" textColor="primary-green" borderColor="primary-green" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
