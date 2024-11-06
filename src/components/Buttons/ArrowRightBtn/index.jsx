import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

export default function ArrowRightBtn({ href, myVenues, myBookings }) {
  return (
    <Link to={href} className={`${myVenues && !myBookings ? "text-primary-green border-primary-green" : "text-primary-blue border-primary-blue"} absolute top-2 right-2 z-30 flex justify-center items-center h-9 w-9 text-xl font-bold rounded-full border bg-white bg-opacity-70 hover:bg-white hover:shadow-md`}>
      <FaArrowRight />
    </Link>
  );
}
