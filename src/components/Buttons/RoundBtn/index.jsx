export default function RoundBtn({
  type = "button",
  innerText,
  tailw = "", // Default to an empty string if not provided
  clickFunc = () => {}, // Default to a no-op function if not provided
  bordered = false,
  bgColor = "primary-green", // Example default color
  textColor = "white",
  borderColor = "primary-green",
}) {
  const buttonClasses = `text-nowrap flex justify-center items-center h-full p-1 px-4 w-full text-nowrap uppercase rounded-full hover:shadow-md cursor-pointer transition duration-300 ease-in-out text-${textColor} bg-${bgColor} ${tailw}`;

  return (
    <button type={type} onClick={clickFunc} className={`${buttonClasses} ${bordered ? `border border-solid border-${borderColor}` : ""}`}>
      {innerText}
    </button>
  );
}
