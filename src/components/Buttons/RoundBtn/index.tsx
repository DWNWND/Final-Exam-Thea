import { useLocation } from "react-router-dom";

interface RoundBtnProps {
  type?: "button" | "submit" | "reset";
  innerText: string;
  tailw?: string;
  clickFunc?: () => void;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  disabled?: boolean; 
  width?: string;
}

export function RoundBtn({ type = "button", innerText, tailw = "", clickFunc = () => {}, bgColor = "primary-green", textColor = "white", borderColor = "primary-green", disabled = false, width = "auto" }: RoundBtnProps) {
  const location = useLocation();

  const buttonClasses = `${disabled ? "bg-comp" : ""} py-2 px-6 w-full ${location.pathname.toLowerCase().includes("login") || location.pathname.toLowerCase().includes("register") || location.pathname.toLowerCase().includes("booking") ? "h-full" : `md:w-${width} h-full`} text-nowrap flex justify-center items-center uppercase rounded-full hover:shadow-md cursor-pointer transition duration-300 ease-in-out text-${textColor} bg-${bgColor} ${tailw} border border-${borderColor}`;

  return (
    <button type={type} onClick={clickFunc} className={buttonClasses} disabled={disabled}>
      {innerText}
    </button>
  );
}

// import { useLocation } from "react-router-dom";

// export function RoundBtn({
//   type = "button",
//   innerText,
//   tailw = "",
//   clickFunc = () => {},
//   bgColor = "primary-green",
//   textColor = "white",
//   borderColor = "primary-green",
//   disabled = false,
//   width = "auto",
// }) {
//   const location = useLocation();

//   let buttonClasses;

//   if (location.pathname.toLowerCase().includes("login") || location.pathname.toLowerCase().includes("register") || location.pathname.toLowerCase().includes("booking")) {
//     buttonClasses = `${disabled && "bg-comp"} py-2 px-6 w-full h-full text-nowrap flex justify-center items-center uppercase rounded-full hover:shadow-md cursor-pointer transition duration-300 ease-in-out text-${textColor} bg-${bgColor} ${tailw} border border-${borderColor}`;
//   } else {
//     buttonClasses = `${disabled && "bg-comp"} py-2 px-6 w-full md:w-${width} h-full text-nowrap flex justify-center items-center uppercase rounded-full hover:shadow-md cursor-pointer transition duration-300 ease-in-out text-${textColor} bg-${bgColor} ${tailw} border border-${borderColor}`;
//   }

//   return (
//     <button type={type} onClick={clickFunc} className={buttonClasses} disabled={disabled}>
//       {innerText}
//     </button>
//   );
// }
