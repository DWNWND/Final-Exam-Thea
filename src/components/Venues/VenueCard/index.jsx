import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function VenueCard({ venue, myVenues = false, myBookings = false }) {
  console.log("Myvenues", myVenues);
  console.log("Mybookings", myBookings);
  return (
    <div className="rounded-lg shadow-md bg-white border-comp">
      <div className="relative">
        <Link to={"/venue/" + venue.id} className={`${myVenues && !myBookings ? "bg-primary-green" : "bg-primary-blue"} absolute z-30 flex justify-center items-center rounded-full h-10 w-10 font-bold text-2xl text-white  top-2 right-2 shadow-md`}>
          <FaArrowRight />
        </Link>
        <div className="absolute bg-black bg-opacity-20 w-full h-full rounded-t-lg"></div>
        <img src={venue.media.length > 0 ? venue.media[0].url : null} alt={venue.media.length > 0 ? venue.media[0].alt : null} className="w-full h-48 object-cover rounded-t-lg" />
        <p className="absolute font-bold text-2xl text-white bottom-2 right-2">kr {venue.price}/night</p>
      </div>
      <div className="p-4 flex justify-between">
        <div>
          <h3 className="text-xl font-bold text-black">{venue.name}</h3>
          <p className="text-black">
            {venue.location.city}, {venue.location.country}
          </p>
        </div>
        <div>
          <p>★ {venue.rating}</p>
        </div>
      </div>
      {myVenues && !myBookings && (
        <div className="p-2 flex flex-col gap-2 ">
          <button className={` rounded p-1 px-3 w-full text-nowrap flex justify-center border bg-comp-gray border-solid border-primary-green text-primary-green uppercase hover:shadow-md cursor-pointer`}>Edit listing</button>
          <button className={` rounded p-1 px-3 w-full text-nowrap flex justify-center border bg-comp-gray border-solid border-primary-green text-primary-green uppercase hover:shadow-md cursor-pointer`}>Check occupancy</button>
        </div>
      )}
      {!myVenues && myBookings && (
        <div className="p-2">
          <button className={` rounded p-1 px-3 w-full text-nowrap flex justify-center border border-solid bg-comp border-primary-blue text-primary-blue uppercase hover:shadow-md cursor-pointer`}>Cancel booking</button>
        </div>
      )}
    </div>
  );
}
