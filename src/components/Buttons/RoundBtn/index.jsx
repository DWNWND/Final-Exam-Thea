import { useLocation } from "react-router-dom";

export default function RoundBtn({
  type = "button",
  innerText,
  tailw = "", // Default to an empty string if not provided
  clickFunc = () => {}, // Default to a no-op function if not provided
  bgColor = "primary-green", // Example default color
  textColor = "white",
  borderColor = "primary-green",
  disabled = false,
  width = "auto",
}) {
  const location = useLocation();

  let buttonClasses;

  if (location.pathname.toLowerCase().includes("login") || location.pathname.toLowerCase().includes("register") || location.pathname.toLowerCase().includes("booking")) {
    buttonClasses = `py-2 px-6 w-full h-full text-nowrap flex justify-center items-center uppercase rounded-full hover:shadow-md cursor-pointer transition duration-300 ease-in-out text-${textColor} bg-${bgColor} ${tailw} border border-${borderColor}`;
  } else {
    buttonClasses = `py-2 px-6 w-full md:w-${width} h-full text-nowrap flex justify-center items-center uppercase rounded-full hover:shadow-md cursor-pointer transition duration-300 ease-in-out text-${textColor} bg-${bgColor} ${tailw} border border-${borderColor}`;
  }

  return (
    <button type={type} onClick={clickFunc} className={buttonClasses} disabled={disabled}>
      {innerText}
    </button>
  );
}

//fix the width prop instead of rendering by location