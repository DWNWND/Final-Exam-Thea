import ArrowRightBtn from "../../Buttons/ArrowRightBtn";
import SquareBtn from "../../Buttons/SquareBtn";
import { Link } from "react-router-dom";

export default function VenueCard({ venue, myVenues = false, myBookings = false }) {
  return (
    <div className="rounded-lg shadow-sm bg-white hover:shadow-lg transition duration-300 ease-in-out relative flex flex-col">
      <Link to={"/venue/" + venue.id} className="h-full w-full absolute opacity-20 hover:opacity-0  transition duration-300 ease-in-out z-30 rounded-lg">
        <div className={`bg-black w-full rounded-t-lg hover:bg-opacity-0 h-48`}></div>
      </Link>
      <div className="relative">
        <ArrowRightBtn href={"/venue/" + venue.id} myVenues={myVenues} myBookings={myBookings} tailw="z-40" />
        <img src={venue.media.length > 0 ? venue.media[0].url : null} alt={venue.media.length > 0 ? venue.media[0].alt : null} className={`w-full h-48 object-cover rounded-t-lg`} />
        <p className="absolute font-bold text-2xl text-white bottom-2 right-2 z-40">kr {venue.price}/night</p>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-bold text-black hover:underline">{venue.name}</h3>
            <p className="text-black">
              {venue.location.city}, {venue.location.country}
            </p>
          </div>
          <div>
            <p>★ {venue.rating}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          {/* fix these links */}
          {myVenues && !myBookings && (
            <>
              <Link to={`/user/edit/listing`} className="z-40">
                <SquareBtn innerText="Edit listing" tailw="hover:bg-comp-gray bg-opacity-50 lowercase" bgColor="white" textColor="primary-green" />
              </Link>
              <Link to={`/user/:listingId/occupancy`} className="z-40">
                <SquareBtn innerText="Check occupancy" tailw="hover:bg-comp-gray bg-opacity-50 lowercase" bgColor="white" textColor="primary-green" />
              </Link>
            </>
          )}
          {!myVenues && myBookings && (
            <Link to={`/user/:bookingId/cancel`} className="z-40">
              <SquareBtn innerText="Cancel booking" tailw="hover:bg-comp bg-opacity-50 lowercase" bgColor="white" textColor="primary-blue" borderColor="primary-blue" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
