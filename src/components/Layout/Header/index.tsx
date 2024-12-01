import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import LogoIcon from "../../../assets/logos/holidaze-logo.svg";
import { useScreenSizeCheckHook } from "../../../hooks";
import FixedBtnDisplay from "../FixedBtnDisplay";
import HamburgerBtn from "./HamburgerBtn";
import { OpenMenuContext } from "../../../contexts/";
import { ArrowLeftBtn } from "../../Buttons";
import { useNavigationStore } from "../../../stores";
import OpenMenu from "./OpenMenu";

export default function Header(): JSX.Element {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);
  const isMobile = useScreenSizeCheckHook();
  const { hasPreviousRoute } = useNavigationStore();
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  const previousRoute = hasPreviousRoute();

  const handleScroll = (): void => {
    if (scrollTimeout) clearTimeout(scrollTimeout);

    const currentScrollY = window.scrollY;
    const isAtTop = currentScrollY < 10;

    const timeout = setTimeout(() => {
      if (isAtTop) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        setIsMenuOpen(false);
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

  return (
    <header className={`shadow-sm transition-transform z-[100] fixed w-full ${isVisible ? "translate-y-0" : "-translate-y-full"} transition-max-height duration-500 ease-in-out ${isMenuOpen ? "max-h-[1000px]" : "max-h-full"}`}>
      <div className={`bg-white w-full h-full flex items-center justify-between p-4 bg-opacity-100 z-[100] ${isMenuOpen && "bg-opacity-100"}`}>
        <div className="flex flex-row items-center gap-8 z-50" onClick={() => setIsMenuOpen(false)}>
          <div className={`${!previousRoute ? "hidden" : "w-6"}`}>
            <ArrowLeftBtn />
          </div>
          <Link to="/" className={`${!previousRoute ? "mx-auto" : "absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none"}`}>
            <img src={LogoIcon} className="h-auto w-auto object-contain" alt="Holidaze logo, click to go to home page" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {!isMobile && <FixedBtnDisplay />}
          <HamburgerBtn />
        </div>
      </div>
      <OpenMenu />
    </header>
  );
}
