interface SquareBtnProps {
  innerText: string;
  tailw?: string;
  clickFunc?: (prop?: any) => void;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  transition?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  width?: string;
  funcProp?: any;
}

export function SquareBtn({ innerText, tailw = "", clickFunc = () => {}, bgColor = "white", textColor = "primary-green", borderColor = "primary-green", transition = "transition duration-300 ease-in-out", disabled = false, type = "button", width = "auto", funcProp = null }: SquareBtnProps) {
  const buttonClasses = `${tailw} text-nowrap flex justify-center p-2 px-4 w-full md:w-${width} items-center h-full text-nowrap uppercase rounded hover:shadow-md cursor-pointer text-${textColor} bg-${bgColor} border border-${borderColor}`;

  return (
    <button type={type} onClick={() => clickFunc(funcProp)} disabled={disabled} className={`${buttonClasses} ${transition}`}>
      {innerText}
    </button>
  );
}