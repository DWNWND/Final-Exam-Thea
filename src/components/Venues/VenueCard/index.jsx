import ArrowRightBtn from "../../Buttons/ArrowRightBtn";
import SquareBtn from "../../Buttons/SquareBtn";
import { Link } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";
import { useEffect, useState } from "react";

export default function VenueCard({ venue, isLoading, setIsLoading, myVenues = false, myBookings = false }) {
  const { userName, venueManager } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Simulate data being loaded after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (isLoading) {
    // Render skeleton loader
    return (
      <div className="rounded-lg shadow-sm bg-white relative flex flex-col">
        <div className="animate-pulse">
          <div className="h-48 bg-comp-gray rounded-t-lg"></div>
          <div className="p-4 flex flex-col gap-4 ">
            <div className="h-6 bg-comp-gray rounded w-3/4"></div>
            <div className="h-4 bg-comp-gray rounded w-1/2"></div>
            {/* <div className="h-6 bg-comp rounded w-full"></div>
            <div className="h-6 bg-comp rounded w-full"></div> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg shadow-sm bg-white hover:shadow-lg transition duration-300 ease-in-out relative flex flex-col">
      <Link to={"/venue/" + venue.id} className="h-full w-full absolute opacity-20 hover:opacity-0  transition duration-300 ease-in-out z-20 rounded-lg">
        <div className={`bg-black w-full rounded-t-lg hover:bg-opacity-0 h-48`}></div>
      </Link>
      <div className="relative">
        <ArrowRightBtn href={"/venue/" + venue.id} myVenues={myVenues} myBookings={myBookings} tailw="z-30" />
        <img src={venue.media.length > 0 ? venue.media[0].url : null} alt={venue.media.length > 0 ? venue.media[0].alt : null} className={`w-full h-48 object-cover rounded-t-lg`} />
        <p className="absolute font-bold text-2xl text-white bottom-2 right-2 z-30">kr {venue.price}/night</p>
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
            <p className="text-nowrap">★ {venue.rating}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          {/* fix these links */}
          {myVenues && !myBookings && (
            <>
              <Link to={`/user/${userName}/occupancy`} className="z-40">
                <SquareBtn innerText="Check occupancy" width="full" tailw="lowercase" bgColor="white" textColor="primary-green" />
              </Link>
              <Link to={`${venueManager ? `/user/${userName}/edit/${venue.id}` : ""}`} className="z-40">
                <SquareBtn innerText={venueManager ? "Edit listing" : "Register as venue manager to edit listing"} borderColor={venueManager ? "primary-green" : "none"} disabled={!venueManager} width="full" tailw="lowercase" bgColor="white" textColor="primary-green" />
              </Link>
            </>
          )}
          {!myVenues && myBookings && (
            <Link to={`/user/:bookingId/cancel`} className="z-40">
              <SquareBtn innerText="Cancel booking" width="full" tailw="lowercase" bgColor="white" textColor="primary-blue" borderColor="primary-blue" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
