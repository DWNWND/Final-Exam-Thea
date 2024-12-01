import { useScreenSizeCheckHook } from "../../../hooks/";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { OpenMenuContext } from "../../../contexts/";
import { useAuthStore } from "../../../stores";
import ListingSpecificSearch from "../../ListingSpecificSearch";

export default function FixedBtnDisplay(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);
  const { userName, accessToken } = useAuthStore();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const pathname = location.pathname;

  const handleScroll = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);

    const currentScrollY = window.scrollY;
    const isAtTop = currentScrollY < 10;

    const timeout = setTimeout(() => {
      if (isAtTop) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    }, 50);
    setScrollTimeout(timeout);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [lastScrollY]);

  const isMobile = useScreenSizeCheckHook();
  const buttonClasses = `text-nowrap flex justify-center p-2 px-4 w-full items-center h-full uppercase rounded xl:hover:shadow-md cursor-pointer transition duration-300 ease-in-out border border-primary-green`;
  const buttonActiveClasses = `text-white bg-primary-green`;
  const buttonInactiveClasses = `text-primary-green bg-white`;

  return (
    <div className={`${isMobile && `${isVisible ? "translate-y-0" : "translate-y-full"} fixed bottom-0 w-full shadow-2xl p-3 bg-white`} ${isMobile && isMenuOpen && "translate-y-full"} z-50 transition-transform duration-300`}>
      <ul className="flex flex-row gap-3 md:gap-4" onClick={() => setIsMenuOpen(false)}>
        {!isMobile && (
          <>
            <li>
              <ListingSpecificSearch />
            </li>
            <li>
              <Link to="/search">
                <button type="button" className={`${buttonClasses} ${pathname.includes("search") ? buttonActiveClasses : buttonInactiveClasses}`}>
                  Browse all stays
                </button>
              </Link>
            </li>
          </>
        )}
        <li className={`${isMobile && "w-full"}`}>
          <Link to={accessToken ? `/user/${userName}/new/listing` : "/login"}>
            <button type="button" className={`${buttonClasses} ${pathname.includes("new") ? buttonActiveClasses : buttonInactiveClasses}`}>
              List your place
            </button>
          </Link>
        </li>
        <li className={`${isMobile && "w-full"}`}>
          <Link to={accessToken ? `/user/${userName}` : "/login"}>
            <button type="button" className={`${buttonClasses} ${pathname.includes("login") || pathname.includes("register") || (pathname.includes("user") && !pathname.includes("new")) ? buttonActiveClasses : buttonInactiveClasses}`}>
              {accessToken ? "My profile" : "Login"}
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
