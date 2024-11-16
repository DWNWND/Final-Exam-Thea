import useCheckScreenSize from "../../../hooks/useCheckScreenSize";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { OpenMenuContext } from "../../../contexts";
import useAuthStore from "../../../stores/useAuthStore";
import SquareBtn from "../../Buttons/SquareBtn";
import RoundBtn from "../../Buttons/RoundBtn";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FixedBtnDisplay() {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);
  const { userName, accessToken } = useAuthStore();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  const handleScroll = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout); // Clear previous timeout to debounce

    const currentScrollY = window.scrollY;
    const isAtTop = currentScrollY < 10; // Adjust threshold if needed

    // Set a timeout to allow for debouncing rapid scroll events
    const timeout = setTimeout(() => {
      if (isAtTop) {
        setIsVisible(true); // Always show header when near the top
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down, hide header
        setIsVisible(false);
      } else {
        // Scrolling up, show header
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    }, 50); // Delay in ms, adjust for sensitivity

    setScrollTimeout(timeout);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout); // Clean up timeout on unmount
    };
  }, [lastScrollY]);

  const isMobile = useCheckScreenSize();

  // if (location.pathname.toLowerCase().includes("login") || location.pathname.toLowerCase().includes("register")) {
  //   return null;
  // }

  return (
    <div className={`${isMobile && `${isVisible ? "translate-y-0" : "translate-y-full"} fixed bottom-0 w-full shadow-2xl p-3 bg-white`}  ${isMobile && isMenuOpen && "translate-y-full"} z-50 transition-transform duration-300`}>
      <ul className="flex flex-row gap-3 md:gap-4" onClick={() => setIsMenuOpen(false)}>
        <li className="w-full">
          <Link to={accessToken ? `/user/${userName}/new/listing` : "/login"}>
            <SquareBtn innerText="List your place" tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />
          </Link>
        </li>
        <li className="w-full">
          <SquareBtn innerText="Nok" tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />
        </li>
        <li className="w-full">
          <Link to={accessToken ? `/user/${userName}` : "/login"} className="w-full">
            <RoundBtn innerText={accessToken ? "My profile" : "Login"} bgColor="primary-green" borderColor="primary-green" textColor="white" />
          </Link>
        </li>
      </ul>
    </div>
  );
}
