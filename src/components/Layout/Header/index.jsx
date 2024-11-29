import { Link, useLocation } from "react-router-dom";
import LogoIcon from "../../../assets/logos/holidaize-logo.svg";
import { useState, useEffect } from "react";
import HamburgerMenu from "./HamburgerMenu";
// import styles from "./Header.module.css";
import useCheckScreenSize from "../../../hooks/useCheckScreenSize";
import FixedBtnDisplay from "../FixedBtnDisplay";
import { useContext } from "react";
import { OpenMenuContext } from "../../../contexts";
import BackBtn from "../../Buttons/BackBtn";
import { useNavigationStore } from "../../../stores/useNavigationStore";

export default function Header() {
  const { isMenuOpen } = useContext(OpenMenuContext);
  const isMobile = useCheckScreenSize();
  const hasPreviousRoute = useNavigationStore((state) => state.hasPreviousRoute());

  return (
    <header className={`fixed w-full flex items-center justify-between p-4 bg-gray-800 z-50 ${isMenuOpen ? "bg-white" : "bg-whiteTransparent"}`}>
      <div className={`${!hasPreviousRoute ? "hidden" : "w-6"}`}>
        <BackBtn tailw={`flex text-primary-green text-3xl`} />
      </div>
      <Link to="/">
        <img src={LogoIcon} className="h-auto w-auto object-contain" alt="Holidaize logo, click to go to home page" />
      </Link>
      <div className="flex items-center gap-4">
        {!isMobile && <FixedBtnDisplay />}
        <HamburgerMenu />
      </div>
    </header>
  );
}
