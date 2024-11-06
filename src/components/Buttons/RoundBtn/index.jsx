export default function RoundBtn({
  type = "button",
  innerText,
  tailw = "", // Default to an empty string if not provided
  clickFunc = () => {}, // Default to a no-op function if not provided
  bgColor = "primary-green", // Example default color
  textColor = "white",
  borderColor = "primary-green",
  disabled = false,
}) {
  const buttonClasses = `text-nowrap flex justify-center items-center h-full p-1 px-4 w-full text-nowrap uppercase rounded-full hover:shadow-md cursor-pointer transition duration-300 ease-in-out text-${textColor} bg-${bgColor} ${tailw} border border-${borderColor}`;

  return (
    <button type={type} onClick={clickFunc} className={buttonClasses} disabled={disabled}>
      {innerText}
    </button>
  );
}
