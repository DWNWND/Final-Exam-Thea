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
            <div className={styles.hide}>menu</div>
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
      <ul className={styles.navContainer}>
        <li>
          <Link to="/" className={styles.navLinkPages} onClick={() => handleClick()}>
            Home
          </Link>
        </li>
        <li>
          <div className={styles.navLinkPages}>Categories</div>
          <ul className={styles.navLinkCategoryList}>
            <li>
              <Link to="/products/electronics" className={styles.navLinkCategories} onClick={() => handleClick()}>
                Electronics
              </Link>
            </li>
            <li>
              <Link to="/products/audio" className={styles.navLinkCategories} onClick={() => handleClick()}>
                Audio
              </Link>
            </li>
            <li>
              <Link to="/products/fashion" className={styles.navLinkCategories} onClick={() => handleClick()}>
                Fashion
              </Link>
            </li>
            <li>
              <Link to="/products/beauty" className={styles.navLinkCategories} onClick={() => handleClick()}>
                Beauty
              </Link>
            </li>
            <li>
              <Link to="/products/watches" className={styles.navLinkCategories} onClick={() => handleClick()}>
                Watches
              </Link>
            </li>
            <li>
              <Link to="/products/shoes" className={styles.navLinkCategories} onClick={() => handleClick()}>
                Shoes
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/contact" className={styles.navLinkPages} onClick={() => handleClick()}>
            Contact us
          </Link>
        </li>
        <li>
          <Link to="/support" className={styles.navLinkPages} onClick={() => handleClick()}>
            Help & support
          </Link>
        </li>
      </ul>
    </nav>
  );
}
