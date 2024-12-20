interface SquareBtnProps {
  innerText: string;
  tail?: string;
  clickFunc?: (prop?: string) => void;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  transition?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  width?: string;
  funcProp?: string;
}

export function SquareBtn({ innerText, tail = "", clickFunc = () => {}, bgColor = "white", textColor = "primary-green", borderColor = "primary-green", transition = "transition duration-300 ease-in-out", disabled = false, type = "button", width = "auto", funcProp = "" }: SquareBtnProps) {
  const buttonClasses = `${tail} text-nowrap flex justify-center p-2 px-4 w-full md:w-${width} items-center h-full uppercase rounded ${disabled ? "opacity-30" : "hover:shadow-md"} cursor-pointer text-${textColor} bg-${bgColor} border border-${borderColor}`;

  return (
    <button type={type} onClick={() => clickFunc(funcProp)} disabled={disabled} className={`${buttonClasses} ${transition}`}>
      {innerText}
    </button>
  );
}
