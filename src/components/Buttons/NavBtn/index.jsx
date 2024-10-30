import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function NavBtn({ innerText, tailw, color, clickFunc, arrow, open }) {
  if (arrow) {
    return (
      <div onClick={clickFunc} className={`${tailw} p-1 px-3 w-full text-sm text-nowrap flex items-center justify-center border border-solid border-${color} text-${color} uppercase hover:shadow-md cursor-pointer`}>
        {innerText}
        <span className="ml-2">{open ? <IoIosArrowUp /> : <IoIosArrowDown />} </span>
      </div>
    );
  } else {
    return (
      <button onClick={clickFunc} className={`${tailw} p-1 px-3 w-full text-sm text-nowrap flex justify-center border border-solid border-${color} text-${color} uppercase hover:shadow-md cursor-pointer`}>
        {innerText}
      </button>
    );
  }
}
