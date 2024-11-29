import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { OpenMenuContext } from "../../../../contexts/";
import { useAuthStore } from "../../../../stores";
import { SquareBtn, RoundBtn } from "../../../Buttons";
import ListingSpesificSearch from "../../../ListingSpesificSearch";
import { useScreenSizeCheckHook } from "../../../../hooks";

export default function OpenMenu(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);
  const { userName, accessToken } = useAuthStore();
  const isMobile = useScreenSizeCheckHook();
  const location = useLocation();

  const pathname = location.pathname;

  const handleClick = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`transition-max-height md:transition-height z-50 duration-500 ease-in-out h-svh md:h-auto overflow-hidden ${isMenuOpen ? "md:h-auto max-h-svh" : "max-h-0 md:h-auto"}`}>
      <ul className="py-10 md:py-20 bg-white flex flex-col lg:flex-row justify-between px-8 md:px-20 gap-4 text-center">
        {isMobile && (
          <>
            <li>
              <Link to="/search" onClick={handleClick}>
                <RoundBtn innerText="Book your next holiday" bgColor="primary-green" borderColor="primary-green" textColor="white" tailw={`${pathname.includes("/search") && "font-bold"}`}/>
              </Link>
            </li>
            <li className="mb-5">
              <ListingSpesificSearch />
            </li>
          </>
        )}
        <li>
          <Link to="/" className={`${pathname === "/" && "font-bold"} text-nowrap md:text-lg text-primary-green`} onClick={handleClick}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" className={`${pathname.includes("/about") && "font-bold"} text-nowrap md:text-lg text-primary-green`} onClick={handleClick}>
            About Holidaze
          </Link>
        </li>
        <li>
          <Link to="/contact" className={`${pathname.includes("/contact") && "font-bold"} text-nowrap md:text-lg text-primary-green`} onClick={handleClick}>
            Contact us
          </Link>
        </li>
        <li>
          <Link to="/terms" className={`${pathname.includes("/terms") && "font-bold"} text-nowrap md:text-lg text-primary-green`} onClick={handleClick}>
            Terms & conditions
          </Link>
        </li>
        <li>
          <Link to="/faq" className={`${pathname.includes("/faq") && "font-bold"} text-nowrap md:text-lg text-primary-green`} onClick={handleClick}>
            FAQ
          </Link>
        </li>
      </ul>
      {accessToken && (
        <div className="bg-comp-green h-full py-4 md:py-10 border-primary-green border">
          <ul className="flex flex-col md:flex-row gap-2 md:gap-8 px-8 md:px-20 items-stretch w-full">
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
