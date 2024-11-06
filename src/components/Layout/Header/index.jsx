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
  const { isMenuOpen } = useContext(OpenMenuContext);
  const isMobile = useCheckScreenSize();
  const hasPreviousRoute = useNavigationStore((state) => state.hasPreviousRoute());

  return (
    <header className={`fixed w-full flex items-center justify-between p-4 bg-gray-800 z-50 bg-white ${!isMenuOpen && "bg-opacity-50"}`}>
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
