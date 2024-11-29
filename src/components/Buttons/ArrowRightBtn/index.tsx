import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

interface ArrowRightBtnProps {
  href: string;
  listing?: boolean;
  booking?: boolean;
  tailw?: string;
}

export function ArrowRightBtn({ href, listing = false, booking = false, tailw = "" }: ArrowRightBtnProps) {
  return (
    <Link
      to={href}
      className={`${listing && "text-primary-green border-primary-green"} ${booking && "text-primary-blue border-primary-blue"} 
        ${tailw} absolute top-2 right-2 z-30 flex justify-center items-center h-9 w-9 text-xl font-bold rounded-full border bg-white bg-opacity-70 hover:bg-white hover:shadow-md`}>
      <FaArrowRight />
    </Link>
  );
}
