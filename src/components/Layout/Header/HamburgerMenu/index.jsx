import { useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";
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
        <button className={styles.hamburgerMenuBtn} value="button to open and close menu" onClick={() => onHamburgerMenuClick()}>
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
    <nav className={`${isMenuOpen ? styles.active : styles.hidden} ${styles.nav}`}>
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
        <div className={`${styles.line} lg:hidden`}></div>
        <li>
          <ul className="flex flex-col gap-4 lg:gap-2">
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
        <div className={`${styles.line} lg:hidden`}></div>
        <li>
          <ul className="flex flex-col gap-2">
            <li className="p-2 rounded-lg flex justify-center content-center border border-solid border-primary-green">
              <Link to="/:username" className={`${styles.openMenuLink} text-primary-green`} onClick={() => handleClick()}>
                My profile
              </Link>
            </li>
            <li className="p-2 rounded-lg flex justify-center content-center border border-solid border-primary-green">
              <Link to="/:username/listings" className={`${styles.openMenuLink} text-primary-green`} onClick={() => handleClick()}>
                My listings
              </Link>
            </li>
            <li className="p-2 rounded-lg flex justify-center content-center border border-solid border-primary-green">
              <Link to="/:username/bookings" className={`${styles.openMenuLink} text-primary-green`} onClick={() => handleClick()}>
                My bookings
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
