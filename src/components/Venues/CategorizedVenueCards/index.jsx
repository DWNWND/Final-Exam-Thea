import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function CategorizedVenueCards({ venues, filters }) {
  return (
    <>
      {venues && venues.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {venues
            .filter((venue) => {
              if (filters === "unique") {
                return venue.name.toLowerCase().includes("unique") || venue.description.toLowerCase().includes("unique");
              } else if (filters === "luxury") {
                return venue.name.toLowerCase().includes("luxury") || venue.description.toLowerCase().includes("luxury");
              } else if (filters === "rating") {
                return venue.rating > 4;
              } else {
                return venue;
              }
            })
            .map((venue) => (
              <div key={venue.id} className="rounded-lg shadow-md bg-white">
                <div className="relative">
                  <Link to={"/listing/" + venue.id} className="absolute z-50 flex justify-center items-center rounded-full h-10 w-10 font-bold text-2xl text-white bg-primary-blue top-2 right-2 shadow-md">
                    <FaArrowRight />
                  </Link>
                  <div className="absolute bg-black bg-opacity-40 w-full h-full rounded-t-lg"></div>
                  <img src={venue.media.length > 0 ? venue.media[0].url : null} alt={venue.name} className="w-full h-48 object-cover rounded-t-lg" />
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
              </div>
            ))}
        </div>
      )}
      <Link className="underline text-black">View all listings from this category</Link>
    </>
  );
}
