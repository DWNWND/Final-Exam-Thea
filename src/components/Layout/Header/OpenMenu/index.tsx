import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { OpenMenuContext } from "../../../../contexts/";
import { useAuthStore } from "../../../../stores";
import ListingSpecificSearch from "../../../ListingSpecificSearch";
import { useScreenSizeCheckHook } from "../../../../hooks";

export default function OpenMenu(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);
  const { userName, accessToken } = useAuthStore();
  const isMobile = useScreenSizeCheckHook();
  const location = useLocation();

  const pathname = location.pathname;

  const handleClick = () => setIsMenuOpen(!isMenuOpen);

  const buttonClasses = `text-nowrap flex justify-center p-2 px-4 w-full items-center h-full uppercase rounded xl:hover:shadow-md cursor-pointer transition duration-300 ease-in-out border border-primary-green`;
  const buttonActiveClasses = `text-white bg-primary-green`;
  const buttonInactiveClasses = `text-primary-green bg-white`;

  return (
    <nav className={`transition-max-height md:transition-height z-50 duration-500 ease-in-out h-svh md:h-auto overflow-hidden ${isMenuOpen ? "md:h-auto max-h-svh" : "max-h-0 md:h-auto"}`}>
      <ul className="py-10 md:py-20 bg-white flex flex-col lg:flex-row justify-between px-8 md:px-20 gap-4 text-center">
        {isMobile && (
          <>
            <li>
              <Link to="/search" onClick={handleClick}>
                <button type="button" className={`${buttonClasses} ${pathname.includes("search") ? buttonActiveClasses : buttonInactiveClasses}`}>
                  Browse all stays
                </button>
              </Link>
            </li>
            <li className="mb-5">
              <ListingSpecificSearch />
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
          <ul className="flex flex-col md:flex-row gap-2 md:gap-8 px-6 md:px-20 items-stretch w-full">
            <li className="w-full">
              <Link to={accessToken ? `/user/${userName}/new/listing` : "/login"} onClick={handleClick}>
                <button type="button" className={`${buttonClasses} ${pathname.includes("new") ? buttonActiveClasses : buttonInactiveClasses}`}>
                  List your place
                </button>
              </Link>
            </li>
            <li className="w-full">
              <Link to={`/user/${userName}/mylistings`} onClick={handleClick}>
                <button type="button" className={`${buttonClasses} ${pathname.includes("mylistings") ? buttonActiveClasses : buttonInactiveClasses}`}>
                  My listings
                </button>
              </Link>
            </li>
            <li className="w-full">
              <Link to={`/user/${userName}/mybookings`} onClick={handleClick}>
                <button type="button" className={`${buttonClasses} ${pathname.includes("mybookings") ? buttonActiveClasses : buttonInactiveClasses}`}>
                  My bookings
                </button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
