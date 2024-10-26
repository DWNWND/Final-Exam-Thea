import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import VisaLogo from "../../../assets/logos/visa-logo.png";
import MastercardLogo from "../../../assets/logos/mastercard-logo.png";
import KlarnaLogo from "../../../assets/logos/klarna-logo.png";
import PaypalLogo from "../../../assets/logos/paypal-logo.png";

function CopyRight() {
  return (
    <div className={styles.copyRight}>
      <p>&copy; 2024 Thea Oland</p>
    </div>
  );
}

export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-20">
        <div className={`${styles.footerCol} flex flex-col gap-2`}>
          <h3>Customer care</h3>
          <ul className="flex flex-col gap-1">
            <li>
              <Link to="/support" className={styles.navLinks}>
                Help & support
              </Link>
            </li>
            <li>
              <Link to="/support" className={styles.navLinks}>
                How to book accommodation
              </Link>
            </li>
            <li>
              <Link to="/support" className={styles.navLinks}>
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${styles.footerCol} flex flex-col gap-2`}>
          <h3>Lazz</h3>
          <ul className="flex flex-col gap-1">
            <li>
              <Link to="/contact" className={styles.navLinks}>
                About Holidaize
              </Link>
            </li>
            <li>
              <Link to="/support" className={styles.navLinks}>
                Privacy policy
              </Link>
            </li>
            <li>
              <Link to="/support" className={styles.navLinks}>
                Terms & conditions
              </Link>
            </li>
            <li>
              <Link to="/contact" className={styles.navLinks}>
                Contact us
              </Link>
            </li>
          </ul>
        </div>
        <div className={`${styles.footerCol} flex flex-col gap-2`}>
          <h3>Payment options</h3>
          <div className={styles.paymentOptions}>
            <img src={VisaLogo} alt="Visa logo, to show that you can pay with visa"></img>
            <img src={MastercardLogo} alt="Mastercard logo, to show that you can pay with Mastercard"></img>
            <img src={KlarnaLogo} alt="Klarna logo, to show that you can pay with Klarna"></img>
            <img src={PaypalLogo} alt="Paypal logo, to show that you can pay with Paypal"></img>
          </div>
        </div>
      </div>
      <CopyRight />
    </footer>
  );
}