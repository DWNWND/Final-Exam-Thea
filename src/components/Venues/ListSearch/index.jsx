import { Link } from "react-router-dom";
import VenueCard from "../VenueCard";

export default function ListSearch({ venues, searchQuery }) {
  return (
    <>
      {venues && venues.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {venues
            .filter((venue) => {
              if (searchQuery.location === venue.location.city) {
                console.log(venue);
                if (searchQuery.freeWifi && searchQuery.petsAllowed && searchQuery.freeParking && searchQuery.freeBreakfast) {
                  return venue.meta.wifi && venue.meta.pets && venue.meta.parking && venue.meta.breakfast;
                } 
                
                
                else if (searchQuery.petsAllowed) {
                  return venue.meta.pets;
                } else if (searchQuery.freeParking) {
                  return venue.meta.parking;
                } else if (searchQuery.freeBreakfast) {
                  return venue.meta.breakfast;
                }
              }
              // if (searchQuery.freeWifi) {
              //   return venue.meta.wifi;
              // } else if (searchQuery.petsAllowed) {
              //   return venue.meta.pets;
              // } else if (searchQuery.freeParking) {
              //   return venue.meta.parking;
              // } else if (searchQuery.freeBreakfast) {
              //   return venue.meta.breakfast;
              // } else {
              //   return venue;
              // }
            })
            .slice(0, 10)
            .map((venue) => (
              <VenueCard venue={venue} key={venue.id} />
            ))}
        </div>
      )}
      {/* <Link className="md:text-center lg:text-left block mt-4 underline text-black">View all listings from this category</Link> */}
    </>
  );
}
