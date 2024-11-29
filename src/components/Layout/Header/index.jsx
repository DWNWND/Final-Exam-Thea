import { Link, useLocation } from "react-router-dom";
import LogoIcon from "../../../assets/logos/holidaize-logo.svg";
import { useState, useEffect } from "react";
import HamburgerMenu from "./HamburgerMenu";
// import styles from "./Header.module.css";
import useCheckScreenSize from "../../../hooks/useCheckScreenSize";

export default function Header() {
  const isMobile = useCheckScreenSize();
  const [backPath, setBackPath] = useState("/");
  const location = useLocation();
  const path = location.pathname;

  //start for backBtn - not done
  useEffect(() => {
    if (path !== "/") {
      setBackPath(path);
    }
  }, [path]);

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800">
      <Link to={backPath} className={`${!isMobile && "hidden"} ${isMobile && path === "/" ? "hidden" : "text-white w-6 h-6"}`}></Link>
      <Link to="/">
        <img src={LogoIcon} className="h-auto w-auto object-contain" alt="Holidaize logo, click to go to home page" />
      </Link>
      <HamburgerMenu />
    </header>
  );
}
