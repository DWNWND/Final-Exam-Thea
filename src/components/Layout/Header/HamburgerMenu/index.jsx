import { useState, createContext, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavBtn } from "../../../Buttons";
import styles from "./HamburgerMenu.module.css";
import { OpenMenuContext } from "../../../../contexts";
import useAuthStore from "../../../../stores/useAuthStore";

export default function HamburgerMenu() {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);

  function onHamburgerMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <button className={`${styles.hamburgerMenuBtn} w-6 h-6`} value="button to open and close menu" onClick={() => onHamburgerMenuClick()}>
        <div className={isMenuOpen ? "burger burger-squeeze open" : "burger burger-squeeze"}>
          <div className="hidden">menu</div>
          <div className="burger-lines"></div>
        </div>
      </button>
      <OpenMenu />
    </>
  );
}

function OpenMenu() {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);
  const { userName } = useAuthStore();

  function handleClick() {
    console.log("clicked");
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  return (
    <nav className={`${isMenuOpen && styles.active} shadow-md border-t border-primary-green`}>
      <ul className="py-10 flex flex-col lg:flex-row justify-between p-8 gap-4">
        <li>
          <Link to="/" className={`${styles.openMenuLink} text-black font-semibold`} onClick={() => handleClick()}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/" className={`${styles.openMenuLink} text-black font-semibold`} onClick={() => handleClick()}>
            Search accommodation
          </Link>
        </li>
        <li>
          <Link to="/new/listing" className={`${styles.openMenuLink} text-black font-semibold`} onClick={() => handleClick()}>
            Add new listing
          </Link>
        </li>
        <div className="line lg:hidden"></div>

        <li>
          <Link to="/about" className={styles.openMenuLink} onClick={() => handleClick()}>
            About Holidaze
          </Link>
        </li>
        <li>
          <Link to="/contact" className={styles.openMenuLink} onClick={() => handleClick()}>
            Contact us
          </Link>
        </li>
        <li>
          <Link to="/terms" className={styles.openMenuLink} onClick={() => handleClick()}>
            Terms & conditions
          </Link>
        </li>
        <li>
          <Link to="/faq" className={styles.openMenuLink} onClick={() => handleClick()}>
            FAQ
          </Link>
        </li>
      </ul>
      {userName && (
        <div className="bg-comp-green h-full">
          <div className="bg-primary-green h-px"></div>
          <ul className="flex flex-col gap-4 p-5">
            <li>
              <Link to={`/user/${userName}`}>
                <NavBtn clickFunc={handleClick} innerText="My profile" tailw="rounded bg-whiteTransparent hover:bg-white " color="primary-green" />
              </Link>
            </li>
            <li>
              <Link to="/:username/listings">
                <NavBtn clickFunc={handleClick} innerText="My listings" tailw="rounded bg-whiteTransparent hover:bg-white " color="primary-green" />
              </Link>
            </li>
            <li>
              <Link to="/:username/bookings">
                <NavBtn clickFunc={handleClick} innerText="My bookings" tailw="rounded bg-whiteTransparent hover:bg-white " color="primary-green" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
