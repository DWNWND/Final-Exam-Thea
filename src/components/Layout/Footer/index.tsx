import { Link } from "react-router-dom";
import VisaLogo from "../../../assets/logos/visa-logo.png";
import MastercardLogo from "../../../assets/logos/mastercard-logo.png";
import KlarnaLogo from "../../../assets/logos/klarna-logo.png";
import PaypalLogo from "../../../assets/logos/paypal-logo.png";
import CopyRight from "./CopyRight";

export default function Footer(): JSX.Element {
  return (
    <footer className="pt-10 pb-24 md:pb-5 w-full bg-desatBlue p-8">
      <div className="flex flex-col justify-between gap-8 md:flex-row lg:gap-20">
        <div className="flex flex-col justify-evenly gap-8 md:flex-row lg:gap-20">
          <div className="flex flex-col gap-2">
            <h2 className="uppercase font-semibold text-primary-blue text-xl">Customer care</h2>
            <ul className="flex flex-col gap-1">
              <li>
                <Link to="/support" className="hover:underline">
                  Help & support
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:underline">
                  How to book accommodation
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="uppercase font-semibold text-primary-blue text-xl">Lazz</h2>
            <ul className="flex flex-col gap-1">
              <li>
                <Link to="/contact" className="hover:underline">
                  About Holidaize
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:underline">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:underline">
                  Terms & conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="uppercase font-semibold text-primary-blue text-xl">Payment options</h2>
          <div className="flex gap-6">
            <img src={VisaLogo} alt="Visa logo, to show that you can pay with visa" />
            <img src={MastercardLogo} alt="Mastercard logo, to show that you can pay with Mastercard" />
            <img src={KlarnaLogo} alt="Klarna logo, to show that you can pay with Klarna" />
            <img src={PaypalLogo} alt="Paypal logo, to show that you can pay with Paypal" />
          </div>
        </div>
      </div>
      <CopyRight />
    </footer>
  );
}
