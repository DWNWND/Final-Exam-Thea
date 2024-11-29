import { useScreenSizeCheckHook } from "../../../hooks/";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { OpenMenuContext } from "../../../contexts/";
import { useAuthStore } from "../../../stores";
import { RoundBtn, SquareBtn } from "../../Buttons";
import ListingSpesificSearch from "../../ListingSpesificSearch";

export default function FixedBtnDisplay(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);
  const { userName, accessToken } = useAuthStore();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

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

  return (
    <div className={`${isMobile && `${isVisible ? "translate-y-0" : "translate-y-full"} fixed bottom-0 w-full shadow-2xl p-3 bg-white`} ${isMobile && isMenuOpen && "translate-y-full"} z-50 transition-transform duration-300`}>
      <ul className="flex flex-row gap-3 md:gap-4" onClick={() => setIsMenuOpen(false)}>
        {!isMobile && (
          <>
            <li>
              <ListingSpesificSearch />
            </li>
            <li>
              <Link to="/search">
                <RoundBtn innerText="Book your next holiday" bgColor="primary-green" borderColor="primary-green" textColor="white" />
                {/* <SquareBtn innerText="Book your next holiday" tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" /> */}
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to={accessToken ? `/user/${userName}/new/listing` : "/login"}>
            <SquareBtn innerText="List your place" tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />
          </Link>
        </li>
        {/* <li className="w-full">
          <SquareBtn innerText="Nok" tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />
        </li> */}
        <li>
          <Link to={accessToken ? `/user/${userName}` : "/login"}>
            <SquareBtn innerText={accessToken ? "My profile" : "Login/register"} tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />

            {/* <RoundBtn innerText={accessToken ? "My profile" : "Login"} bgColor="primary-green" borderColor="primary-green" textColor="white" /> */}
          </Link>
        </li>
      </ul>
    </div>
  );
}
