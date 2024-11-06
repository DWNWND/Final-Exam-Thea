import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";


//this is used in the listingSearchForm
export default function ArrowDownBtn({
  innerText,
  tailw = "",
  color = "primary-green",
  clickFunc = () => {},
  open = false,
}) {
  const buttonClasses = `${tailw} p-1 px-3 w-full rounded my-4 text-nowrap flex items-center justify-center uppercase hover:shadow-md cursor-pointer text-${color} border border-${color}`;

  return (
    <div onClick={clickFunc} className={buttonClasses}>
      {innerText}
      <span className="ml-2">{open ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
    </div>
  );
}
