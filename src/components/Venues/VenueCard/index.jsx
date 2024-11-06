import ArrowRightBtn from "../../Buttons/ArrowRightBtn";

export default function VenueCard({ venue, myVenues = false, myBookings = false }) {
  return (
    <div className="rounded-lg shadow-md bg-white border-comp">
      <div className="relative">
        <ArrowRightBtn href={"/venue/" + venue.id} myVenues={myVenues} myBookings={myBookings} />
        <div className={`absolute bg-black bg-opacity-20 w-full h-full rounded-t-lg`}></div>
        <img src={venue.media.length > 0 ? venue.media[0].url : null} alt={venue.media.length > 0 ? venue.media[0].alt : null} className={`w-full h-48 object-cover rounded-t-lg`} />
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
          {/* fix these links */}
          {myVenues && !myBookings && (
            <>
              <Link to={`/user/edit/listing`}>
                <SquareBtn innerText="Edit listing" tailw="hover:bg-comp-gray bg-opacity-50" bordered={true} bgColor="white" textColor="primary-green" borderColor="primary-green" />
              </Link>
              <Link to={`/user/:listingId/occupancy`}>
                <SquareBtn innerText="Check occupancy" tailw="hover:bg-comp-gray bg-opacity-50" bordered={true} bgColor="white" textColor="primary-green" borderColor="primary-green" />
              </Link>
            </>
          )}
          {!myVenues && myBookings && (
            <Link to={`/user/:bookingId/cancel`}>
              <SquareBtn innerText="Cancel booking" tailw="hover:bg-comp bg-opacity-50" bordered={true} bgColor="white" textColor="primary-blue" borderColor="primary-blue" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
