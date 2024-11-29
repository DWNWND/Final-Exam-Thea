import { IoIosArrowDown } from "react-icons/io";

interface ArrowDownBtnProps {
  innerText?: string;
  tailw?: string;
  clickFunc?: () => void;
  open?: boolean;
  link?: boolean;
  mainSearch?: boolean;
}

export function ArrowDownBtn({ innerText = "", tailw = "", clickFunc = () => {}, open = false, link = false, mainSearch = true }: ArrowDownBtnProps) {
  const buttonClasses = `p-1 px-3 w-auto max-w-auto rounded text-nowrap flex items-center justify-center ${link ? "" : "border lg:hover:shadow-md"} cursor-pointer transition duration-300 ease-in-out ${mainSearch && (open ? "border-primary-green text-primary-green" : "hover:text-primary-green hover:border-primary-green border-primary-light text-primary-light")} ${!mainSearch && (open ? "border-white text-white" : "hover:text-white hover:border-white border-comp-purple text-comp-purple")} ${tailw} `;

  return (
    <div onClick={clickFunc} className={buttonClasses}>
      {innerText}
      <span className={`ml-2 transition-transform duration-300 ease-in-out ${open ? "rotate-180" : "rotate-0"}`}>
        <IoIosArrowDown />
      </span>
    </div>
  );
}
