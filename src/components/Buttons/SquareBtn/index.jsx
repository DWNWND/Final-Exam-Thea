export default function SquareBtn({
  innerText,
  tailw = "", // Default to an empty string if not provided
  clickFunc = () => {}, // Default to a no-op function if not provided
  bordered = false,
  bgColor = "white", // Example default color
  textColor = "primary-green",
  borderColor = "primary-green",
}) {
  const buttonClasses = `${tailw} text-nowrap flex justify-center p-1 px-3 w-full items-center h-full text-nowrap uppercase rounded hover:shadow-md cursor-pointer transition duration-300 ease-in-out text-${textColor} bg-${bgColor}`;

  return (
    <button onClick={clickFunc} className={`${buttonClasses} ${bordered ? `border border-solid border-${borderColor}`: ""}`}>
      {innerText}
    </button>
  );
}
