import { IoIosArrowDown } from "react-icons/io";

interface ArrowDownBtnProps {
  innerText?: string;
  tailw?: string;
  clickFunc?: () => void;
  open?: boolean;
  link?: boolean;
  mainSearch?: boolean;
}

export function ArrowDownBtn({ innerText = "", tailw = "", clickFunc = () => {}, open = false, link = false, mainSearch = true }: ArrowDownBtnProps): JSX.Element {
  const buttonClasses = `p-1 px-3 w-auto max-w-auto rounded text-nowrap flex items-center justify-center ${link ? "" : "border lg:hover:shadow-md"} cursor-pointer transition duration-300 ease-in-out ${mainSearch && "border-primary-green text-primary-green"} ${!mainSearch && "border-white text-white"} ${tailw} `;

  return (
    <div onClick={clickFunc} className={buttonClasses}>
      {innerText}
      <span className={`ml-2 transition-transform duration-300 ease-in-out ${open ? "rotate-180" : "rotate-0"}`}>
        <IoIosArrowDown />
      </span>
    </div>
  );
}
