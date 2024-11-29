import { useLocation } from "react-router-dom";

export default function SquareBtn({
  innerText,
  tailw = "", // Default to an empty string if not provided
  clickFunc = () => {}, // Default to a no-op function if not provided
  bgColor = "white", // Example default color
  textColor = "primary-green",
  borderColor = "primary-green",
  transition = "transition duration-300 ease-in-out",
  disabled = false,
  type = "button",
  width = "auto",
}) {
  const buttonClasses = `${tailw} text-nowrap flex justify-center p-2 px-4 w-full md:w-${width} items-center h-full text-nowrap uppercase rounded hover:shadow-md cursor-pointer text-${textColor} bg-${bgColor} border border-${borderColor}`;

  return (
    <button onClick={clickFunc} disabled={disabled} className={`${buttonClasses} ${transition}`}>
      {innerText}
    </button>
  );
}

//fix the width prop instead of rendering by location
