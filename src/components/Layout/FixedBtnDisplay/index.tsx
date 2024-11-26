import { useScreenSizeCheckHook } from "../../../hooks/";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { OpenMenuContext } from "../../../contexts/";
import { useAuthStore } from "../../../stores";
import { RoundBtn, SquareBtn } from "../../Buttons";

export default function FixedBtnDisplay(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);
  const { userName, accessToken } = useAuthStore();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleScroll = () => {
    if (scrollTimeout) clearTimeout(scrollTimeout); // Clear previous timeout to debounce

    const currentScrollY = window.scrollY;
    const isAtTop = currentScrollY < 10; // Adjust threshold if needed

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
  }, [lastScrollY, scrollTimeout]);

  const isMobile = useScreenSizeCheckHook();

  return (
    <div
      className={`${isMobile && `${isVisible ? "translate-y-0" : "translate-y-full"} fixed bottom-0 w-full shadow-2xl p-3 bg-white`}  
                  ${isMobile && isMenuOpen && "translate-y-full"} 
                  z-50 transition-transform duration-300`}>
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

// import { useScreenSizeCheckHook } from "../../../hooks/";
// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { OpenMenuContext } from "../../../contexts";
// import { useAuthStore } from "../../../stores";
// import { RoundBtn, SquareBtn } from "../../Buttons";
// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";

// export default function FixedBtnDisplay() {
//   const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);
//   const { userName, accessToken } = useAuthStore();
//   const location = useLocation();
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [scrollTimeout, setScrollTimeout] = useState(null);

//   const handleScroll = () => {
//     if (scrollTimeout) clearTimeout(scrollTimeout); // Clear previous timeout to debounce

//     const currentScrollY = window.scrollY;
//     const isAtTop = currentScrollY < 10; // Adjust threshold if needed

//     // Set a timeout to allow for debouncing rapid scroll events
//     const timeout = setTimeout(() => {
//       if (isAtTop) {
//         setIsVisible(true); // Always show header when near the top
//       } else if (currentScrollY > lastScrollY) {
//         // Scrolling down, hide header
//         setIsVisible(false);
//       } else {
//         // Scrolling up, show header
//         setIsVisible(true);
//       }

//       setLastScrollY(currentScrollY);
//     }, 50); // Delay in ms, adjust for sensitivity

//     setScrollTimeout(timeout);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       if (scrollTimeout) clearTimeout(scrollTimeout); // Clean up timeout on unmount
//     };
//   }, [lastScrollY]);

//   const isMobile = useScreenSizeCheckHook();

//   return (
//     <div className={`${isMobile && `${isVisible ? "translate-y-0" : "translate-y-full"} fixed bottom-0 w-full shadow-2xl p-3 bg-white`}  ${isMobile && isMenuOpen && "translate-y-full"} z-50 transition-transform duration-300`}>
//       <ul className="flex flex-row gap-3 md:gap-4" onClick={() => setIsMenuOpen(false)}>
//         <li className="w-full">
//           <Link to={accessToken ? `/user/${userName}/new/listing` : "/login"}>
//             <SquareBtn innerText="List your place" tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />
//           </Link>
//         </li>
//         <li className="w-full">
//           <SquareBtn innerText="Nok" tailw="hover:bg-white bg-opacity-50" bgColor="white" textColor="primary-green" borderColor="primary-green" />
//         </li>
//         <li className="w-full">
//           <Link to={accessToken ? `/user/${userName}` : "/login"} className="w-full">
//             <RoundBtn innerText={accessToken ? "My profile" : "Login"} bgColor="primary-green" borderColor="primary-green" textColor="white" />
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// }
