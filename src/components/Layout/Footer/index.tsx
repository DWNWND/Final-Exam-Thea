import { Link } from "react-router-dom";
import VisaLogo from "../../../assets/logos/visa-logo.png";
import MastercardLogo from "../../../assets/logos/mastercard-logo.png";
import KlarnaLogo from "../../../assets/logos/klarna-logo.png";
import PaypalLogo from "../../../assets/logos/paypal-logo.png";

function CopyRight(): JSX.Element {
  return (
    <div className="py-1 mt-12 w-full bg-desatBlue flex justify-center items-center text-primary-blue">
      <p>&copy; 2024 Thea Oland</p>
    </div>
  );
}

export default function Footer(): JSX.Element {
  return (
    <footer className="pt-10 pb-24 md:pb-5 w-full bg-desatBlue p-8">
      <div className="flex flex-col justify-between gap-8 md:flex-row lg:gap-20">
        <div className="flex flex-col justify-evenly gap-8 md:flex-row lg:gap-20">
          <div className="flex flex-col gap-2">
            <h3 className="uppercase font-semibold text-primary-blue text-xl">Customer care</h3>
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
            <h3 className="uppercase font-semibold text-primary-blue text-xl">Lazz</h3>
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
          <h3 className="uppercase font-semibold text-primary-blue text-xl">Payment options</h3>
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

// import { Link } from "react-router-dom";
// import VisaLogo from "../../../assets/logos/visa-logo.png";
// import MastercardLogo from "../../../assets/logos/mastercard-logo.png";
// import KlarnaLogo from "../../../assets/logos/klarna-logo.png";
// import PaypalLogo from "../../../assets/logos/paypal-logo.png";

// function CopyRight() {
//   return (
//     <div className="py-1 mt-12 w-full bg-desatBlue flex justify-center items-center text-primary-blue">
//       <p>&copy; 2024 Thea Oland</p>
//     </div>
//   );
// }

// export default function Footer() {
//   return (
//     <footer className="pt-10 pb-24 md:pb-5 w-full bg-desatBlue p-8">
//       <div className="flex flex-col justify-between gap-8 md:flex-row lg:gap-20">
//         <div className="flex flex-col justify-evenly gap-8 md:flex-row lg:gap-20">
//           <div className="flex flex-col gap-2">
//             <h3 className="uppercase font-semibold text-primary-blue text-xl">Customer care</h3>
//             <ul className="flex flex-col gap-1">
//               <li>
//                 <Link to="/support" className="hover:underline">
//                   Help & support
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/support" className="hover:underline">
//                   How to book accommodation
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/support" className="hover:underline">
//                   FAQ
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div className="flex flex-col gap-2">
//             <h3 className="uppercase font-semibold text-primary-blue text-xl">Lazz</h3>
//             <ul className="flex flex-col gap-1">
//               <li>
//                 <Link to="/contact" className="hover:underline">
//                   About Holidaize
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/support" className="hover:underline">
//                   Privacy policy
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/support" className="hover:underline">
//                   Terms & conditions
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="hover:underline">
//                   Contact us
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="flex flex-col gap-2">
//           <h3 className="uppercase font-semibold text-primary-blue text-xl">Payment options</h3>
//           <div className="flex gap-6">
//             <img src={VisaLogo} alt="Visa logo, to show that you can pay with visa"></img>
//             <img src={MastercardLogo} alt="Mastercard logo, to show that you can pay with Mastercard"></img>
//             <img src={KlarnaLogo} alt="Klarna logo, to show that you can pay with Klarna"></img>
//             <img src={PaypalLogo} alt="Paypal logo, to show that you can pay with Paypal"></img>
//           </div>
//         </div>
//       </div>
//       <CopyRight />
//     </footer>
//   );
// }