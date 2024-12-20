import { ArrowRightBtn, SquareBtn } from "../../Buttons";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../stores";
import { ListingCardSkeletonLoader } from "../../Loaders";
import { ListingSpecificProps } from "../../../types";

interface ListingCardCompProps {
  listing?: ListingSpecificProps;
  loading: boolean;
  myListings?: boolean;
}

export function ListingCard({ listing, loading, myListings = false }: ListingCardCompProps): JSX.Element {
  const { userName, venueManager } = useAuthStore();

  return (
    <>
      {loading ? (
        <ListingCardSkeletonLoader />
      ) : (
        <>
          {listing && (
            <div key={listing.id} className="rounded-lg shadow-sm bg-white hover:shadow-lg transition duration-300 ease-in-out relative flex flex-col">
              <ArrowRightBtn href={`/listing/${listing.id}`} listing={true} tail="z-40" />
              <Link to={`/listing/${listing.id}`} className="h-48 w-full z-30 rounded-lg">
                <div className="bg-black w-full rounded-t-lg h-48 z-40 opacity-30 absolute"></div>
                <div className="relative">
                  <img src={listing.media.length > 0 ? listing.media[0].url : ""} alt={listing.media.length > 0 ? listing.media[0].alt : ""} className="w-full h-48 object-cover rounded-t-lg" />
                </div>
              </Link>
              <div className="p-4 flex flex-col gap-4">
                <div className="flex justify-between cursor-default">
                  <div>
                    <h3 className="text-xl font-bold text-black">{listing.name}</h3>
                    <p className="text-black">
                      {listing.location.city}, {listing.location.country}
                    </p>
                  </div>
                  <div>
                    <p className="text-nowrap ">★ {listing.rating}</p>
                  </div>
                </div>
                <div className="font-bold text-2xl text-primary-green text-center mb-3">
                  <p>kr {listing.price}/night</p>
                </div>
                {myListings && (
                  <div className="flex flex-col gap-2">
                    <Link to={`/user/${userName}/occupancy/${listing.id}`} className="z-40">
                      <SquareBtn innerText={listing.bookings && listing.bookings.length >= 1 ? "Check occupancy" : "This property has no bookings yet"} tail={listing.bookings && listing.bookings.length < 1 ? "hover:shadow-none cursor-default lowercase" : "lowercase"} borderColor={listing.bookings && listing.bookings.length >= 1 ? "primary-green" : "none"} width="full" bgColor="" textColor="primary-green" disabled={listing.bookings && listing.bookings.length < 1} />
                    </Link>
                    <Link to={venueManager ? `/user/${userName}/edit/${listing.id}` : ""} className="z-40">
                      <SquareBtn innerText={venueManager ? "Edit listing" : "Register as venue manager to edit listing"} borderColor={venueManager ? "primary-green" : "none"} disabled={!venueManager} width="full" tail={!venueManager ? "hover:shadow-none cursor-default lowercase" : "lowercase"} bgColor="" textColor="primary-green" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
