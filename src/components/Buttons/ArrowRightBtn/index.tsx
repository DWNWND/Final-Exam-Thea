import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

interface ArrowRightBtnProps {
  href: string;
  myVenues?: boolean;
  myBookings?: boolean;
  tailw?: string;
}

export function ArrowRightBtn({ href, myVenues, myBookings, tailw = "" }: ArrowRightBtnProps) {
  return (
    <Link
      to={href}
      className={`${myVenues && !myBookings ? "text-primary-green border-primary-green" : "text-primary-blue border-primary-blue"} 
        ${tailw} absolute top-2 right-2 z-30 flex justify-center items-center h-9 w-9 text-xl font-bold rounded-full border bg-white bg-opacity-70 hover:bg-white hover:shadow-md`}>
      <FaArrowRight />
    </Link>
  );
}
