import { Link, useLocation } from "react-router-dom";
import LogoIcon from "../../../assets/logos/holidaize-logo.svg";
import { useState, useEffect } from "react";
import HamburgerMenu from "./HamburgerMenu";
// import styles from "./Header.module.css";
import useCheckScreenSize from "../../../hooks/useCheckScreenSize";
import FixedBtnDisplay from "../FixedBtnDisplay";
import { useContext } from "react";
import { OpenMenuContext } from "../../../contexts";
import ArrowLeftBtn from "../../Buttons/ArrowLeftBtn";
import { useNavigationStore } from "../../../stores/useNavigationStore";

export default function Header() {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);
  const isMobile = useCheckScreenSize();
  const hasPreviousRoute = useNavigationStore((state) => state.hasPreviousRoute());
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);


  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY === 0) {
      setIsVisible(true);
    } else {
      if (currentScrollY > lastScrollY) {
        // Scrolling down, hide header
        setIsVisible(false);
        setIsMenuOpen(false);
      } else {
        // Scrolling up, show header
        setIsVisible(true);
      }
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header className={`fixed w-full flex items-center justify-between p-4 z-50 bg-white bg-opacity-50 ${isMenuOpen && "bg-opacity-100"} transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="flex flex-row items-center gap-8">
        <div className={`${!hasPreviousRoute ? "hidden" : "w-6"}`}>
          <ArrowLeftBtn />
        </div>
        <Link to="/" className={` ${!hasPreviousRoute ? "mx-auto" : "absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none"}`}>
          <img src={LogoIcon} className="h-auto w-auto object-contain" alt="Holidaize logo, click to go to home page" />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {!isMobile && <FixedBtnDisplay />}
        <HamburgerMenu />
      </div>
    </header>
  );
}
