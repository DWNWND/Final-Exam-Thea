import { useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { NavBtn } from "../../../Buttons";
import styles from "./HamburgerMenu.module.css";

const OpenMenuContext = createContext();

export default function HamburgerMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function onHamburgerMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <OpenMenuContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
        <button className={`${styles.hamburgerMenuBtn} w-6 h-6`} value="button to open and close menu" onClick={() => onHamburgerMenuClick()}>
          <div className={isMenuOpen ? "burger burger-squeeze open" : "burger burger-squeeze"}>
            <div className="hidden">menu</div>
            <div className="burger-lines"></div>
          </div>
        </button>
        <OpenMenu />
      </OpenMenuContext.Provider>
    </>
  );
}

function OpenMenu() {
  const { isMenuOpen, setIsMenuOpen } = useContext(OpenMenuContext);

  function handleClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className={`${isMenuOpen && styles.active} shadow-md`}>
      <ul className="flex flex-col lg:flex-row justify-evenly gap-4 p-6 bg-white">
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
          <ul className="flex flex-col gap-4 lg:gap-2  text-black">
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
          </ul>
        </li>
        <li>
          <ul className="flex flex-col gap-4 lg:gap-2 text-black">
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
        </li>
        <div className="line lg:hidden"></div>
        <li>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/:username">
                <NavBtn innerText="My profile" tailw="rounded" color="primary-green" />
              </Link>
            </li>
            <li>
              <Link to="/:username/listings">
                <NavBtn innerText="My listings" tailw="rounded" color="primary-green" />
              </Link>
            </li>
            <li>
              <Link to="/:username/bookings">
                <NavBtn innerText="My bookings" tailw="rounded" color="primary-green" />
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
